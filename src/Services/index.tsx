
const urls = {
    1: 'https://hn.algolia.com/api/v1/search_by_date?query=angular&page=',
    2: 'https://hn.algolia.com/api/v1/search_by_date?query=reactjs&page=',
    3: 'https://hn.algolia.com/api/v1/search_by_date?query=vuejs&page='
}

enum Type {
    'angular' = 1,
    'react' = 2,
    'vue' = 3
}

export const getData = (type: Type, page: number) => fetch(`${urls[type]}${page}`).then(data=>data.json());

