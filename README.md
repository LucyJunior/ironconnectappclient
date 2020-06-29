# IronConnect

IronConnect is a social network made with the idea of connecting graduated ironhackers with new ironhackers as well as portraing a list of the students in
Lets new Ironhackers and new Ironhackers connect with each other, w


## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform with my detail and information so that I can start creating and managing my backlog
-  **Login:** As a user I can login to the platform so that I can start creating and managing my backlog
-  **Logout:** As a user I can logout from the platform so no one else can modify my information
-  **Profile** As a user I can see and edit my profile 
-  **Create Posts** As a user I can edit new posts  
-  **Delete Posts** As a user I can delete the posts that I edited
-  **Linking Posts** As a user I can like or dislike posts 

## Backlog

- Github
- Filter profiles
- Filter posts
- Comment a post

<br>

# Client / Frontend

## React Router Routes (React App)
| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/`                       | Landing                        | public `<Route>`            | Home page                                        |
| `/signup`                 | SignupPage                     | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | LoginPage                      | anon only `<AnonRoute>`     | Login form, link to signup, navigate to profile after login  |
| `/logout`                 | n/a                            | user only `<PrivateRoute>`  | Navigate to homepage after logout, expire session             |
| `/backlog/github`         | NavBar, FooterBar              | users only `<PrivateRoute>` | Shows all the github repository on backlog                    |
| `/ironhackers`            | Profiles, NavBar, FooterBar    | public     `<Route>`        | View the profiles of the Ironhackers                          |
| `/ironhackers/id`         | ProfileDetails                 | public     `<Route>`        | See profile display page                                      |
| `/add/:id`                | ElementInfo                    | user only `<PrivateRoute>`  | Add an element to the backlog                                 |
| `/profile`                | Profile, Stats                 | user only  `<PrivateRoute>` | Check profile with stat information                           |



</br>

## Components

- NavBar

- SignUp

- IronConnect

- Posts


# Server / Backend


## Models

UserModel

```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  date: { type: Date, default: Date.now }});
}
```



ProfileModel

```javascript
 { user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  website: { type: String },
  
  bio: { type: String },
  
  skills: { type: [String], required: true },
  githubusername: { type: String },
  experience: [
    { title: { type: String, required: true },
      company: { type: String, required: true },
      location: { type: String },
      description: { type: String } } ],
      
  education: [
    { school: { type: String, required: true },
      degree: { type:String, require:true},
      description: { type: String } ],
    
  socialmedia: { youtube: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    instagram: { type: String }
  
});

PostsModel

```javascript
   user: { type: Schema.Types.ObjectId },
  text: { type: String, required: true },
  name: { type: String },
  pic: { type: String },
  likes: { user: { type: Schema.Types.ObjectId } } ,
  date: { type: Date, default: Date.now });

<br>

## API Endpoints (backend routes)

<br>


## Links

### GitHub Projects

[Link to GitHub projects](https://github.com/LucyJunior/IronConnect) 

### Git

[Client repository Link](https://github.com/LucyJunior/IronConnect)

[Server repository Link](https://github.com/LucyJunior/IronConnect)

[Deployed App Link](#)

### Slides

[Slides Link](#)
