const deleteMessage = (id: string) => {
  console.log(id)
  const item = document.getElementById(id)
  item?.classList.add('transition')
  item?.addEventListener('transitionend', () => {
    item?.remove()
  })
}

export default deleteMessage
