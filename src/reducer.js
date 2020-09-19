export const initialState = {
  countries: [{label: "Worldwide", value: "worldwide"}],
  country: "worldwide",
  countryInfo: {},
  tableData: []

};

//
export const actionTypes = {
  LIST_COUNTRIES: "LIST_COUNTRIES",
  SET_COUNTRY: "SET_COUNTRY"

}

export const reducer = (state, action) => {

  switch (action.type) {
    //thiết lập tải khoản user để đăng nhập vào facebook 
    case actionTypes.LIST_COUNTRIES:
      return {
        ...state,
        countries: action.countries,
        tableData: action.tableData
      };
      case actionTypes.SET_COUNTRY:
        return {
          ...state,
          country: action.country,
          countryInfo: action.countryInfo
      };
  
    default:
      return state;
  }
}