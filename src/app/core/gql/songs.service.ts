import {Injectable} from '@angular/core';
import {Track} from '../models/track';
import {Query} from 'apollo-angular';
import gql from 'graphql-tag';

export interface Response {
  songs: Track[];
}


@Injectable({
  providedIn: 'root'
})
export class SongsService extends Query<Response> {

    document = gql`
        query allSongs {
            songs {
                title
                startTime
                notes {
                    note
                    startTime
                    stopTime
                }
            }
        }
    `;
}
