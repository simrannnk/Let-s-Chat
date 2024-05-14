export const isEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}

// export const updateRecentUser = () => {}

//   setUser((prev) => {
//     let index = prev.data.findIndex((dat) => dat.id == roomId)
//     if (index == -1) {
//       return {
//         data: [{ ...activeUser, isRead: 1 }, ...prev.data],
//         pagination: prev.pagination,
//       }
//     } else {
//       let recent = JSON.parse(JSON.stringify(prev.data))
//       arraymove(recent, index, 0)
//       return {
//         data: [...recent],
//         pagination: prev.pagination,
//       }
//     }
//   })
// }

// export const arraymove = (arr, fromIndex, toIndex) => {
//   var element = arr[fromIndex];
//   arr.splice(fromIndex, 1);
//   arr.splice(toIndex, 0, element);
// };
