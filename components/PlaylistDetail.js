import React from 'react';
import {FlatList, StyleSheet, Text, View, Image, ScrollView} from "react-native";
import {GetPlaylistDetail} from '../API'
import SongItem from './SongItem'
import PlayerItem from './PlayerItem'

export default class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: undefined
        }
    }

    componentDidMount() {
        GetPlaylistDetail(this.props.route.params.idPlaylist).then(data => {
            this.setState({playlist: data})
        });
    }

    displayPlaylistDetail() {
        if (this.state.playlist != undefined) {
            return (
                <View style={styles.header}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{uri: this.state.playlist.images[0].url}}
                            style={styles.image}
                        />
                    </View>

                    <View style={styles.infos}>
                        <Text style={styles.title}>{this.state.playlist.name}</Text>
                        <Text style={styles.author}>Playlist by {this.state.playlist.owner.display_name}</Text>
                        <Text style={styles.description}>{this.state.playlist.description}</Text>
                        <Text style={styles.followers}>{this.state.playlist.followers.total} followers</Text>
                    </View>
                </View>
            )
        }
    }

    displaySongs() {
        if (this.state.playlist != undefined) {
            return (
                <ScrollView>
                    {this.state.playlist.tracks.items.map((item) => (
                        <SongItem key={item.track.id} song={item}/>
                    ))}
                </ScrollView>
            )
        } else {
            return (<Text>Aucun son trouvé</Text>)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    {this.displayPlaylistDetail()}
                    {this.displaySongs()}
                </View>
                <View style={styles.playerContainer}>
                    <PlayerItem/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        marginTop: 50,
        flexDirection: 'row'
    },
    playerContainer : {
        position: 'absolute',
        bottom: 0,
        width : '100%',
    },
    image: {
        margin: 5,
        width: 100,
        height: 100,
    },
    imageContainer: {
        flex: 4,
    },
    infos: {
        flex: 8,
        flexDirection: 'column'
    },
    description: {
        color: '#fff',
        marginTop: 10
    },
    title: {
        fontSize: 24,
        color: '#fff',
    },
    author: {
        color: '#999'
    },
    followers: {
        color: '#999'
    },
});