import React from 'react'
import {
  View,
  Animated,
  StyleSheet,
} from 'react-native'
import ajax from '../util/ajax'
import DealList from './DealList'
import DealDetail from './DealDetail'
import SearchBar from './SearchBar'

class App extends React.Component {
  titleXPos = new Animated.Value(0)
  state = {
    deals: [],
    dealsFromSearch: [],
    currentDealId: null,
  }

  async componentWillMount() {
  
  }

  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals()
    this.setState({ deals })
  }

  searchDeals = async (searchTerm) => {
    let dealsFromSearch = []
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealSearchResults(searchTerm)
    }
    this.setState({ dealsFromSearch })
  }

  setCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: dealId,
    })
  }

  unsetCurrentDeal = () => {
    this.setState({
      currentDealId: null,
    })
  }
  
  currentDeal = () => {
    return this.state.deals.find((deal) => deal.key === this.state.currentDealId)
  }

  render() {
    if (this.state.currentDealId) {
      return (
        <View style={styles.main}>
          <DealDetail
            initialDealData={this.currentDeal()}
            onBack={this.unsetCurrentDeal}
          />
        </View>
      )
    }
    const dealsToDisplay =
      this.state.dealsFromSearch.length > 0
        ? this.state.dealsFromSearch
        : this.state.deals
      return (
        <View style={styles.main}>
          <SearchBar searchDeals={this.searchDeals} />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    marginTop: 30,
  },
  header: {
    fontSize: 40,
  },
})

export default App
