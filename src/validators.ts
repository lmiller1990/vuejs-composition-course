interface Rule {
  type: 'required' | 'length'
}

interface Require extends Rule {
  type: 'required'
}

interface MinMaxOptions {
  min: number
  max: number
}

interface Length extends Rule {
  type: 'length'
  options: MinMaxOptions
}

export function required(): Require {
  return {
    type: 'required'
  }
}

export function length(options: MinMaxOptions): Length {
  return {
    type: 'length',
    options
  }
}

type Validator = Require | Length

export interface Status {
  valid: boolean
  message?: string
}

export function validate(value: string, validators: Validator[]): Status {
  for (const validator of validators) {
    if (validator.type === 'required' && (!value || !value.length)) {
      return {
        valid: false,
        message: 'This field is required'
      }
    }

    if (validator.type === 'length' && (value.length < validator.options.min || value.length > validator.options.max)) {
      return {
        valid: false,
        message: `This field has a minimum length of ${validator.options.min} and a maximum length of ${validator.options.max}`
      }
    }
  }

  // ...
  return {
    valid: true
  }
}
