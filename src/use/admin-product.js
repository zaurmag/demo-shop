import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed } from 'vue'

export function useAdminProductForm(submit, initialValues) {
  const { handleSubmit, handleReset, values, meta } = useForm({initialValues})

  // Title
  const { value: title, errorMessage: tError, handleBlur: tBlur } = useField(
    'title',
    yup
      .string()
      .required('Введите заголовок продукта')
      .trim()
  )

  // Image
  const { value: img, errorMessage: iError, handleBlur: iBlur } = useField(
    'img',
    yup
      .string()
      .trim()
  )

  // Price
  const { value: price, errorMessage: pError, handleBlur: pBlur } = useField(
    'price',
    yup
      .string()
      .required('Введите цену продукта')
      .trim()
  )

  // Count
  const { value: count, errorMessage: cError, handleBlur: cBlur } = useField(
    'count',
    yup
      .string()
      .required('Введите остаток товара')
      .trim()
  )

  // Category
  const { value: category, errorMessage: catError, handleBlur: catBlur } = useField(
    'category')

  const changed = computed(() => {
    return Object.keys(values).some(key => values[key] !== meta.value.initialValues[key])
  })

  const onSubmit = handleSubmit(submit)

  return {
    title,
    tError,
    tBlur,
    img,
    iError,
    iBlur,
    price,
    pError,
    pBlur,
    count,
    cError,
    cBlur,
    category,
    catError,
    catBlur,
    onSubmit,
    handleReset,
    changed
  }
}
