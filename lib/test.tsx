enum ContractStatus {
  ongoing,
  expired,
  terminated,
  draft,
}

const a = {
  ...ContractStatus,
  all: 4,
  4: "all",
}

console.log(a)
