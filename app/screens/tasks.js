import React from 'react';
import { FlatList, Image, View, TouchableOpacity } from 'react-native';
import { RkText, RkCard, RkStyleSheet } from 'react-native-ui-kitten';
import Axios from 'axios';
import { scaleVertical } from '../utils/scale';

export class Tasks extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
  }

  static navigationOptions = {
    title: 'Volunteer'.toUpperCase(),
  };

  async componentDidMount() {
    const response = await Axios.get('http://localhost:8082/api/tasks');
    this.setState({
      tasks: response.data,
    });
  }

  extractItemKey = item => `${item.id}`;

  renderItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={() => this.props.navigation.navigate('Task', { id: item.id })}
    >
      <RkCard style={styles.card}>
        <Image rkCardImg source={{ uri: item.imageUrl }} style={styles.img} />
        <View
          rkCardContent
          style={{
            width: 300,
            flexGrow: 1,
          }}
        >
          <RkText
            numberOfLines={1}
            rkType="header6"
            style={{ fontWeight: 'bold', paddingBottom: 6 }}
          >
            {item.title}
          </RkText>
          <RkText style={styles.post} numberOfLines={2} rkType="secondary1">
            {item.subTitle}
          </RkText>
        </View>
      </RkCard>
    </TouchableOpacity>
  );

  render = () => (
    <View>
      <FlatList
        data={this.state.tasks}
        renderItem={this.renderItem}
        keyExtractor={this.extractItemKey}
        style={styles.container}
      />
    </View>
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  card: {
    marginVertical: 8,
    flexDirection: 'row',
  },
  img: {
    width: 120,
    height: 120,
  },

  post: {
    marginTop: 13,
  },
}));
