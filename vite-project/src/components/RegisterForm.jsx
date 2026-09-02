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

  if (!form.category) {
    errors.category = 'Select a category.'
  }

  if (!form.manufacturer.trim()) {
    errors.manufacturer = 'Manufacturer is required.'
  }

  if (form.healthRating === '') {
    errors.healthRating = 'Health rating is required.'
  } else {
    const rating = Number(form.healthRating)
    if (!Number.isInteger(rating) || rating < 1 || rating > 100) {
      errors.healthRating = 'Health rating must be a whole number from 1 to 100.'
    }
  }

  if (!form.brandName.trim()) {
    errors.brandName = 'Tech brand name is required.'
  }

  if (!form.userRole) {
    errors.userRole = 'Select a user role.'
  }

  return errors
}

export default function RegisterForm({ onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  function updateField(field, value) {
    const next = { ...form, [field]: value }
    setForm(next)
    if (touched[field]) {
      setErrors(validate(next))
    }
  }

  function handleBlur(field) {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate(form))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    setTouched({
      gadgetName: true,
      category: true,
      manufacturer: true,
      healthRating: true,
      brandName: true,
      userRole: true,
    })

    if (Object.keys(nextErrors).length > 0) return

    onSubmit({
      ...form,
      healthRating: Number(form.healthRating),
    })
    setForm(EMPTY_FORM)
    setTouched({})
    setErrors({})
  }

  const fieldClass = (field) =>
    `w-full rounded-md border bg-surface px-3 py-2 text-sm outline-none transition-colors focus:border-accent ${
      errors[field] && touched[field] ? 'border-danger' : 'border-border'
    }`

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
        className="w-full max-w-xl rounded-lg border border-border bg-surface-raised p-6"
    >
    <h2 className="text-base font-semibold mb-6">Register a gadget</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="gadgetName">
            Gadget name
          </label>
          <input
            id="gadgetName"
            type="text"
            value={form.gadgetName}
            onChange={(e) => updateField('gadgetName', e.target.value)}
            onBlur={() => handleBlur('gadgetName')}
            className={fieldClass('gadgetName')}
          />
          {errors.gadgetName && touched.gadgetName && (
            <p className="mt-1 text-xs text-danger">{errors.gadgetName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => updateField('category', e.target.value)}
            onBlur={() => handleBlur('category')}
            className={fieldClass('category')}
          >
            <option value="">Select a category…</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && touched.category && (
            <p className="mt-1 text-xs text-danger">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="manufacturer">
            Manufacturer
          </label>
          <input
            id="manufacturer"
            type="text"
            value={form.manufacturer}
            onChange={(e) => updateField('manufacturer', e.target.value)}
            onBlur={() => handleBlur('manufacturer')}
            className={fieldClass('manufacturer')}
          />
          {errors.manufacturer && touched.manufacturer && (
            <p className="mt-1 text-xs text-danger">{errors.manufacturer}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="healthRating">
            Health rating (1–100)
          </label>
          <input
            id="healthRating"
            type="number"
            min={1}
            max={100}
            value={form.healthRating}
            onChange={(e) => updateField('healthRating', e.target.value)}
            onBlur={() => handleBlur('healthRating')}
            className={`${fieldClass('healthRating')} font-mono`}
          />
          {errors.healthRating && touched.healthRating && (
            <p className="mt-1 text-xs text-danger">{errors.healthRating}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="brandName">
            Tech brand name
          </label>
          <input
            id="brandName"
            type="text"
            value={form.brandName}
            onChange={(e) => updateField('brandName', e.target.value)}
            onBlur={() => handleBlur('brandName')}
            className={fieldClass('brandName')}
          />
          {errors.brandName && touched.brandName && (
            <p className="mt-1 text-xs text-danger">{errors.brandName}</p>
          )}
        </div>

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
          {errors.userRole && touched.userRole && (
            <p className="mt-1 text-xs text-danger">{errors.userRole}</p>
          )}
        </fieldset>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-accent py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Add to registry
      </button>
    </form>
  )
}