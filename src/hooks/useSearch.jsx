import { useState } from "react"

export const useSearch = (q, params) => {
    const [searchParam] = useState(params)
    // console.log(q)
    function search(items) {
        return items.filter((item) =>
            searchParam.some((newItem) =>
                item[newItem]
                    ? item[newItem]
                          .toString()
                          .toLowerCase()
                          .indexOf(q.toLowerCase()) > -1
                    : ""
            )
        )
    }
    return search
}
