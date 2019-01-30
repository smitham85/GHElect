import React from 'react';
import { ScrollView, Image, Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from '../components';
import { RkCard, RkText, RkStyleSheet } from 'react-native-ui-kitten';
import Axios from 'axios';

const moment = require('moment');

export class Task extends React.Component {
  static navigationOptions = {
    title: 'Task View'.toUpperCase(),
  };

  constructor(props) {
    super(props);
    this.state = {
      task: [],
      profileImg: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const taskId = this.props.navigation.getParam('id', 1);
    const response = await Axios.get(
      `http://localhost:8082/api/tasks/${taskId}`
    );
    this.setState({
      task: response.data,
      profileImg: response.data.user.profileUrl,
      loading: false,
    });
  }

  render() {
    if (this.state.loading === true) {
      return <Text>Loading</Text>;
    } else {
      return (
        <ScrollView style={styles.root}>
          <RkCard rkType="article">
            <Image rkCardImg source={{ uri: this.state.task.imageUrl }} />
            <View rkCardHeader>
              <View>
                <RkText style={styles.title} rkType="header4">
                  {this.state.task.title}
                </RkText>
                <RkText rkType="secondary2 hintColor">
                  {moment()
                    .add(this.state.task.createdAt, 'seconds')
                    .fromNow()}
                </RkText>
              </View>
              <TouchableOpacity onPress={this.onAvatarPressed}>
                <Avatar
                  rkType="circle"
                  source={{ uri: this.state.profileImg }}
                />
              </TouchableOpacity>
            </View>
            <View rkCardContent>
              <View>
                <RkText>{this.state.task.description}</RkText>
              </View>
            </View>
          </RkCard>
        </ScrollView>
      );
    }
  }
}

const styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  title: {
    marginBottom: 5,
  },
}));
