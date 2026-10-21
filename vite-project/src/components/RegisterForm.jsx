import { useState } from 'react'
import { CATEGORIES, USER_ROLES } from '../lib/constants'

const EMPTY_FORM = {
  gadgetName: '',
  category: '',
  manufacturer: '',
  healthRating: '',
  brandName: '',
  userRole: '',
}

function validate(form) {
  const errors = {}

  if (!form.gadgetName.trim()) {
    errors.gadgetName = 'Gadget name is required.'
  } else if (form.gadgetName.trim().length < 3) {
    errors.gadgetName = 'Gadget name must be at least 3 characters.'
  }

  if (!form.category) errors.category = 'Select a category.'
  if (!form.manufacturer.trim()) errors.manufacturer = 'Manufacturer is required.'

  if (form.healthRating === '') {
    errors.healthRating = 'Health rating is required.'
  } else {
    const rating = Number(form.healthRating)
    if (!Number.isInteger(rating) || rating < 1 || rating > 100) {
      errors.healthRating = 'Health rating must be a whole number from 1 to 100.'
    }
  }

  if (!form.brandName.trim()) errors.brandName = 'Tech brand name is required.'
  if (!form.userRole) errors.userRole = 'Select a user role.'

  return errors
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={id}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

export default function RegisterForm({ item, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    item ? { ...item, healthRating: String(item.healthRating) } : EMPTY_FORM,
  )
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const isEditing = Boolean(item)
  const shownError = (name) => (touched[name] ? errors[name] : undefined)

  function updateField(name, value) {
    const next = { ...form, [name]: value }
    setForm(next)
    if (touched[name]) setErrors(validate(next))
  }

  function handleBlur(name) {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validate(form))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    setTouched(Object.fromEntries(Object.keys(EMPTY_FORM).map((name) => [name, true])))

    if (Object.keys(nextErrors).length > 0) return

    onSubmit({
      gadgetName: form.gadgetName.trim(),
      category: form.category,
      manufacturer: form.manufacturer.trim(),
      healthRating: Number(form.healthRating),
      brandName: form.brandName.trim(),
      userRole: form.userRole,
    })
  }

  const inputProps = (name) => ({
    id: name,
    value: form[name],
    onChange: (e) => updateField(name, e.target.value),
    onBlur: () => handleBlur(name),
    'aria-invalid': Boolean(shownError(name)),
    'aria-describedby': shownError(name) ? `${name}-error` : undefined,
    className: `w-full rounded-md border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-accent ${
      shownError(name) ? 'border-danger' : 'border-border'
    }`,
  })

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-xl rounded-lg border border-border bg-surface-raised p-6"
    >
      <h2 className="text-base font-semibold mb-6">{isEditing ? 'Edit gadget' : 'Register a gadget'}</h2>

      <div className="space-y-4">
        <Field id="gadgetName" label="Gadget name" error={shownError('gadgetName')}>
          <input type="text" {...inputProps('gadgetName')} />
        </Field>

        <Field id="category" label="Category" error={shownError('category')}>
          <select {...inputProps('category')}>
            <option value="">Select a category…</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field id="manufacturer" label="Manufacturer" error={shownError('manufacturer')}>
          <input type="text" {...inputProps('manufacturer')} />
        </Field>

        <Field id="healthRating" label="Health rating (1–100)" error={shownError('healthRating')}>
          <input type="number" min={1} max={100} {...inputProps('healthRating')} />
        </Field>

        <Field id="brandName" label="Tech brand name" error={shownError('brandName')}>
          <input type="text" {...inputProps('brandName')} />
        </Field>

        <fieldset>
          <legend className="block text-sm font-medium mb-1">User role</legend>
          <div className="flex gap-4">
            {USER_ROLES.map((role) => (
              <label key={role} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="userRole"
                  value={role}
                  checked={form.userRole === role}
                  onChange={(e) => updateField('userRole', e.target.value)}
                  onBlur={() => handleBlur('userRole')}
                  className="accent-accent"
                />
                {role}
              </label>
            ))}
          </div>
          {shownError('userRole') && (
            <p className="mt-1 text-xs text-danger">{shownError('userRole')}</p>
          )}
        </fieldset>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-md bg-accent py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {isEditing ? 'Save changes' : 'Add to registry'}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
