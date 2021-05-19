import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed } from 'vue'

export function useAdminCategoryForm(submit, initialValues) {
  const { handleSubmit, handleReset, values, meta } = useForm({initialValues})

  // Title
  const { value: title, errorMessage: tError, handleBlur: tBlur } = useField(
    'title',
    yup
      .string()
      .required('Введите заголовок категории')
      .trim()
  )

  // Type
  const { value: type, errorMessage: typeError, handleBlur: typeBlur } = useField(
    'type',
    yup
      .string()
      .required('Введите тип категории')
      .trim()
  )

  const changed = computed(() => {
    return Object.keys(values).some(key => values[key] !== meta.value.initialValues[key])
  })

  const onSubmit = handleSubmit(submit)

  return {
    title,
    tError,
    tBlur,
    type,
    typeError,
    typeBlur,
    onSubmit,
    handleReset,
    changed
  }
}
