let blocks = document.querySelectorAll("pre:has(code)")
let copyButtonLabel = "Copy Code"


for (const block of blocks) {
  // only add button if browser supports Clipboard API
  if (navigator.clipboard) {
    let button = document.createElement("button")

    block.setAttribute("tabindex", 0)
    button.innerText = copyButtonLabel
    block.appendChild(button)

    button.addEventListener("click", async () => {
      await copyCode(block, button)
    })
  }
}

async function copyCode(block, button) {
  let code = block.querySelector("code")
  let text = code.innerText

  await navigator.clipboard.writeText(text)

  // visual feedback that task is completed
  button.innerText = "Code Copied"

  setTimeout(() => {
    button.innerText = copyButtonLabel
  }, 1000)
}