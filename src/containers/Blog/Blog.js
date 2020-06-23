import React, { Component } from 'react';
import axios from "axios"
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts:[],
    selectedPostId:null
  }

    async componentDidMount(){
      try {
          const response = await axios.get("/posts");
          const updatedPosts = response.data.slice(0,4).map((post)=>(
            {...post,author:"Anuj"}
          ));
          this.setState({posts:updatedPosts})
      } catch (e) {
          console.log(e);
      }
    }

    postSelectedHandler=(id)=>{
         this.setState({selectedPostId:id})
    }

    render () {
      const posts = this.state.posts.map((post)=>(
        <Post clicked={()=>this.postSelectedHandler(post.id)} key={post.id} title={post.title} author={post.author}/>
      ))
        return (
            <div>
                <section className="Posts">
                {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
