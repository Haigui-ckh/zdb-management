

export function getList() {
  this.listLoading = true
  fetchList(this.listQuery).then(response => {
    this.list = response.data.items
    this.total = response.data.total
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 1.5 * 1000)
  })
}

export function handleFilter() {
  this.listQuery.page = 1
  this.getList()
}