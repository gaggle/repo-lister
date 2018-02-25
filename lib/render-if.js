export default function renderIf (condition, renderFn) {
  return condition ? renderFn() : null
}

export function renderIfElse (condition, renderFn, elseFn) {
  return condition ? renderFn() : elseFn()
}
