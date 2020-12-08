import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-storage';
import 'firebase/database';
import {FirebaseConfig} from '../data/fbconfig';

firebase.initializeApp(FirebaseConfig);
firebase.analytics();