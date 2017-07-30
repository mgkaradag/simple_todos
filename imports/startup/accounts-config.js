/**
 * Created by gokhanmb on 25/05/17.
 */
import {Accounts} from 'meteor/accounts-base';

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY',
});