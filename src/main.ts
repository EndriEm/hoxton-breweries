type Brewery = {
    address_2: null;
    address_3: null;
    brewery_type: string;
    city: string;
    country: string;
    county_province: null;
    created_at: string;
    id: number;
    latitude: string;
    longitude: string;
    name: string;
    obdb_id: string;
    phone: string;
    postal_code: string;
    state: string;
    street: string;
    updated_at: string;
    website_url: string;
}

type State = {
    USState: string,
    breweries: Brewery[]
    }
    
    let state: State = {
        USState: '',
        breweries: []
    }
    
    let mainEl = document.querySelector('main')
  
    let h1El = document.createElement('h1')
    h1El.textContent = 'List of Breweries'

    let searchHeader = document.createElement('header')
    searchHeader.classList.add('search-bar')

    let searchForm = document.createElement('form')
    searchForm.classList.add('search-breweries-form')

    let searchLabel = document.createElement('label')
    searchLabel.htmlFor = 'search-breweries'
    searchLabel.textContent = 'Search breweries:'

    let searchInput = document.createElement('input')
    searchInput.id = 'search-breweries'
    searchInput.name = 'search-breweries'
    searchInput.type = 'text'

    searchForm.append(searchLabel, searchInput)
    searchHeader.append(searchForm)
    mainEl.append(h1El ,searchHeader)


    function getBreweries() {
        fetch('https://api.openbrewerydb.org/breweries')
        .then(response => response.json())
        .then(data => {
            state.breweries = data
            render()
          })
        }


        function getSearchedBreweries () {
            fetch(
              `https://api.openbrewerydb.org/breweries?by_name=${state.search}&by_state=${state.USState}`
            )
              .then(resp => resp.json())
              .then(breweries => {
                state.breweries = breweries
                render()
              })
          }


          function createSingleBreweryLi (brewery: Brewery) {
            let breweryLi = document.createElement('li')
          
            let breweryTitle = document.createElement('h2')
            breweryTitle.textContent = brewery.name
          
            let breweryTypeDiv = document.createElement('div')
            breweryTypeDiv.className = 'type'
            breweryTypeDiv.textContent = brewery.brewery_type
          
            let breweryAddressSection = document.createElement('section')
            breweryAddressSection.className = 'address'
          
            let breweryAddressTitle = document.createElement('h3')
            breweryAddressTitle.textContent = 'Address:'
          
            let breweryAddressLine1 = document.createElement('p')
            breweryAddressLine1.textContent = brewery.street
          
            let breweryAddressLine2 = document.createElement('p')
          
            let breweryAddressLine2Strong = document.createElement('strong')
            breweryAddressLine2Strong.textContent = `${brewery.city}, ${brewery.postal_code}`
          
            let breweryPhoneSection = document.createElement('section')
            breweryPhoneSection.className = 'phone'
          
            let breweryPhoneTitle = document.createElement('h3')
            breweryPhoneTitle.textContent = 'Phone:'
          
            let breweryPhoneP = document.createElement('p')
            breweryPhoneP.textContent = brewery.phone ? brewery.phone : 'N/A'
          
            let breweryLinkSection = document.createElement('section')
            breweryLinkSection.className = 'link'
          
            let breweryLinkA = document.createElement('a')
            if (brewery.website_url) {
              breweryLinkA.href = brewery.website_url ? brewery.website_url : '#'
              breweryLinkA.target = '_blank'
              breweryLinkA.textContent = 'Visit Website'
            } else {
              breweryLinkA.textContent = 'No Website'
            }
          
            breweryLi.append(
              breweryTitle,
              breweryTypeDiv,
              breweryAddressSection,
              breweryPhoneSection,
              breweryLinkSection
            )
            breweryAddressSection.append(
              breweryAddressTitle,
              breweryAddressLine1,
              breweryAddressLine2
            )
            breweryAddressLine2.append(breweryAddressLine2Strong)
            breweryPhoneSection.append(breweryPhoneTitle, breweryPhoneP)
            breweryLinkSection.append(breweryLinkA)
          
            return breweryLi
          }
          

