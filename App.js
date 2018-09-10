import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';

export default class App extends Component{

	constructor(props){
		super(props);
		this.state = { datas: [], loading: true, dataEnd: false };
		this.getData();
	}

	getData(){
		if ( !this.state.dataEnd ){

			fetch( 'http://192.168.201.2/***/datas.php?limit=' + this.state.datas.length )
			.then((response) => response.json()).then((responseJson) => {
				
				if ( responseJson.length == 0 ){
					this.setState({ loading: false, dataEnd: true });
				}else{
					this.setState({ datas: this.state.datas.concat(responseJson) });
					setTimeout( () => {
						this.setState({ loading: false });
					}, 300);
				}
			});
		}else{

			this.setState({ loading: false });

		}
	}

	handleScroll(event){

		let {
			contentSize,
			contentInset,
			contentOffset,
			layoutMeasurement,
		} = event.nativeEvent;

		let contentLength = contentSize.height;
		let scrollOffset = contentOffset.y;
		let viewportLength = layoutMeasurement.height;

		let sonuc = contentLength - scrollOffset - viewportLength;

		if ( sonuc < 300 && !this.state.loading ){ this.setState({ loading: true }); this.getData(); }

	}

	render(){
		return (
			<View style={styles.bg}>
				<Text style={styles.welcome}>Welcome to React Native!</Text>
				<ScrollView onScroll = {this.handleScroll.bind(this)}>
					{ this.state.datas.map((item, key) => (		
						<Text style={{ backgroundColor: '#fff', padding: 16, marginTop: 2 }} key={key}>{ item.indis + ' --> ' + item.name }</Text>
					))}

					{ this.state.loading && ( <View style={{ paddingVertical: 16 }}><ActivityIndicator size="large" color="#f1c40f" /></View> ) }
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bg: { flex: 1, backgroundColor: '#eee' },
	welcome: { backgroundColor: '#555', color: '#fff', textAlign: 'center', padding: 32, fontSize: 26 }
});