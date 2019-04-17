import React from 'react'
import {
  View,
  Animated,
  StyleSheet
} from 'react-native'
import ajax from '../util/ajax'
import DealList from './DealList'
import DealDetail from './DealDetail'
import SearchBar from './SearchBar'

class App extends React.Component {

  state = {
    deals: [],
    currentDealId: null
  }

  async componentWillMount() {
  
  }

  async componentDidMount() {
    const deals = await ajax.fetchDealSearchResults()
    this.setState({ deals })
  }

  searchDeals = async (searchTerm) => {
    let deals = []
    if (searchTerm) {
      deals = await ajax.fetchDealSearchResults(searchTerm)
    }
    this.setState({ deals })
  }

  setCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: dealId
    })
  }

  unsetCurrentDeal = () => {
    this.setState({
      currentDealId: null
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

      return (
        <View style={styles.main}>
          <SearchBar searchDeals={this.props.searchDeals}/>
          <DealList deals={this.state.deals} onItemPress={this.setCurrentDeal} />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    marginTop: 30
  },
  header: {
    fontSize: 40
  }
})

export default App
