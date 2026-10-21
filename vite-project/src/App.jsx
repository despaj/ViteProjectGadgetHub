import { useEffect, useMemo, useState } from "react";
import RegisterForm from "./components/RegisterForm";
import GadgetTable from "./components/GadgetTable";
import ItemDetailCard from "./components/ItemDetailCard";
import StatsBar from "./components/StatsBar";
import useLocalStorage from "./lib/useLocalStorage";
import { exportCsv } from "./lib/exportCsv";
import { CATEGORIES, SAMPLE_ITEMS } from "./lib/constants";

const FILTERS = ["All", ...CATEGORIES];

const tabClass = (active) =>
  `flex-1 sm:flex-none px-3 py-1.5 rounded text-sm font-medium transition-colors ${
    active ? "bg-accent text-white" : "text-text-muted hover:text-text"
  }`;

function App() {
  const [items, setItems] = useLocalStorage("gadget-hub:items", []);
  const [view, setView] = useState(() =>
    items.length > 0 ? "registry" : "register",
  );
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3000);
    return () => clearTimeout(timer);
  }, [notice]);

  const query = search.trim().toLowerCase();

  const filteredItems = useMemo(
    () =>
      items.filter(
        (i) =>
          (categoryFilter === "All" || i.category === categoryFilter) &&
          (!query ||
            [i.gadgetName, i.manufacturer, i.brandName].some((v) =>
              v.toLowerCase().includes(query),
            )),
      ),
    [items, categoryFilter, query],
  );

  const selectedItem = items.find((i) => i.id === selectedId) ?? null;
  const editingItem = items.find((i) => i.id === editingId) ?? null;

  function openRegister() {
    setEditingId(null);
    setView("register");
  }

  function handleSave(data) {
    if (editingItem) {
      setItems((prev) =>
        prev.map((i) => (i.id === editingItem.id ? { ...i, ...data } : i)),
      );
      setSelectedId(editingItem.id);
      setNotice(`Updated ${data.gadgetName}.`);
    } else {
      const id = crypto.randomUUID();
      setItems((prev) => [...prev, { id, ...data }]);
      setSelectedId(id);
      setNotice(`Added ${data.gadgetName} to the registry.`);
    }
    setEditingId(null);
    setView("registry");
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setView("register");
  }

  function handleDelete(item) {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    setSelectedId(null);
    setNotice(`Deleted ${item.gadgetName}.`);
  }

  function handleLoadSamples() {
    setItems(SAMPLE_ITEMS.map((i) => ({ id: crypto.randomUUID(), ...i })));
    setNotice("Loaded sample data.");
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 pt-10 sm:pt-16">
      <div
        className={`w-full mx-auto ${view === "register" ? "max-w-xl" : "max-w-4xl"}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-lg font-semibold tracking-tight">Gadget Hub</h1>
          <nav
            aria-label="Main"
            className="flex w-full sm:w-auto gap-1 bg-surface rounded-md p-1 border border-border"
          >
            <button
              onClick={openRegister}
              aria-current={view === "register" ? "page" : undefined}
              className={tabClass(view === "register")}
            >
              {editingItem ? "Edit item" : "Register item"}
            </button>
            <button
              onClick={() => setView("registry")}
              aria-current={view === "registry" ? "page" : undefined}
              className={tabClass(view === "registry")}
            >
              Registry ({items.length})
            </button>
          </nav>
        </div>

        <div
          role="status"
          aria-live="polite"
          className="min-h-6 mb-2 text-sm text-accent"
        >
          {notice}
        </div>

        {view === "register" && (
          <div className="flex justify-center">
            <RegisterForm
              key={editingItem?.id ?? "new"}
              item={editingItem}
              onSubmit={handleSave}
              onCancel={() => {
                setEditingId(null);
                setView("registry");
              }}
            />
          </div>
        )}

        {view === "registry" && items.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-8 text-center">
            <p className="text-sm text-text-muted mb-4">
              No gadgets registered yet. Add one, or load sample data to
              explore.
            </p>
            <div className="flex justify-center gap-2">
              <button
                onClick={openRegister}
                className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Register a gadget
              </button>
              <button
                onClick={handleLoadSamples}
                className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface"
              >
                Load sample data
              </button>
            </div>
          </div>
        )}

        {view === "registry" && items.length > 0 && (
          <div>
            <StatsBar items={items} />

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, brand, manufacturer"
                aria-label="Search gadgets"
                className="w-full sm:w-64 rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-accent"
              />
              <div
                className="flex flex-wrap items-center gap-2"
                role="group"
                aria-label="Filter by category"
              >
                {FILTERS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategoryFilter(c)}
                    aria-pressed={categoryFilter === c}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium border transition-colors ${
                      categoryFilter === c
                        ? "bg-accent text-white border-accent"
                        : "border-border text-text-muted hover:text-text"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <button
                onClick={() => exportCsv(filteredItems)}
                disabled={filteredItems.length === 0}
                className="ml-auto rounded-md border border-border px-3 py-1 text-xs font-medium hover:bg-surface disabled:opacity-40"
              >
                Export CSV
              </button>
            </div>

            {filteredItems.length === 0 ? (
              <p className="text-sm text-text-muted">
                No gadgets match your search or filter.
              </p>
            ) : (
              <GadgetTable
                items={filteredItems}
                selectedId={selectedId}
                onSelectRow={(item) =>
                  setSelectedId((prev) => (prev === item.id ? null : item.id))
                }
              />
            )}

            <div className="mt-4">
              <ItemDetailCard
                key={selectedItem?.id ?? "none"}
                item={selectedItem}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
