export default function (condition, renderFn) {
  return condition ? renderFn() : null
}

