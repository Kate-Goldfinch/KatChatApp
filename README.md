# A Real-Time Chat Service

Kate Goldfinch

## Base Functionality

- The landing page will allow users register with the chat service or, if already registered, will show the list of conversations
- The conversation view will show the list of messages, most recent first, and a text box to allow posting messages
- Messages are updated regularly - your app pulls the updated message list at a set interval when showing a conversation so that replies can be seen.
- Users can delete their own messages
- Users can navigate between conversations
- Users can create a new conversation

## Extended Functionality

- Account creation now requires a username and password, which is hashed using bcrypt and saved on the database.
- On sucessful login, the user recieves a JSON Web Token to authenticate their session.
- Friends - Users can add other users as friends, as well as remove them from friends list. Adding a friend will reciprocally add the user to the other users friends group.
- User search - Search for a user from a list of valid users to add as a friend based on partial name entry using regex
- Conversation participants - Changed the focus of the app from a reddit style forum with all conversations visible to something more like Facebook messenger, with users only able to see conversations they are a participant of. Updated implemention of the conversations so that only friends can be added as participants to conversations.
