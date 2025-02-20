import _ from 'lodash'

const getInfoData = <T>(params: { fields: (keyof T)[]; object: Partial<T> }) => {
  return _.pick(params.object, params.fields)
}

export default getInfoData
