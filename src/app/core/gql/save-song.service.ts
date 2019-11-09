import {Injectable} from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';
import {Track} from '../models/track';

export interface SaveSongResponse {
  success: boolean;
  message: string;
  songs: Track[];
}

@Injectable({
  providedIn: 'root'
})
export class SaveSongService extends Mutation {
    document = gql`
        mutation saveSong($song: SongInput!) {
            saveSong(song: $song) {
                success
                message
            }
        }
    `;
}


