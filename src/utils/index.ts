import _ from 'lodash'

const getInfoData = <T>(params: { fields: (keyof T)[]; object: Partial<T> }) => {
  return _.pick(params.object, params.fields)
}

const unGetDataSelectProduct = (select: string[] = []): Record<string, 0> => {
  return Object.fromEntries(select.map((el: string) => [el, 0]))
}

export { getInfoData, unGetDataSelectProduct }
