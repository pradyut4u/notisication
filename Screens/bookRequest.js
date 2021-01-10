import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase'
import db from '../config.js'
import MyHeader from '../Components/myHeader'

export default class BookRequest extends React.Component{
	constructor(){
		super()
		this.state={
			userId:firebase.auth().currentUser.email,
			bookName: '',
			reason: ''
		}
	}
	uniqueId(){
		return(
			Math.random().toString(36).substring(7)
		)
	}
	addRequest = (bookName,reason) =>{
		var userId=this.state.userId
		var requestId=this.uniqueId()
		db.collection('requestedBook').add({
		userId:userId,bookName:bookName,reason:reason,requestId:requestId})
		this.setState({
			bookName:'',
			reason:''
		})
		return(
			alert("Book requested Succesfully")
		)
	}

    getBookRequest = ()=>{
		db.collection('requestedBook').where("userId","==",this.state.userId).get()
		.then(snapShot=>{
			snapShot.forEach(doc=>{
				if(doc.data().bookStatus!=="recive"){
					this.setState({
						
					})
				}

			})
		})
	}

	render(){
		return(
			<View>
				<MyHeader title={"Request"} navigation={this.props.navigation}/>
			<KeyboardAvoidingView>
			<TextInput placeholder="Book name" onChangeText={text=>{this.setState({bookName:text})}} value={this.state.bookName}/>
			<TextInput placeholder="Reason" multiline numberOfLines={5} onChangeText={text=>{this.setState({reason:text})}} value={this.state.reason}/>
			<TouchableOpacity onPress={()=>{this.addRequest(this.state.bookName,this.state.reason)}}>
			<Text>Request</Text>
			</TouchableOpacity>
			</KeyboardAvoidingView>
			</View>
		)
	}
}