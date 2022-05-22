import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/sidebar";
import "./App.scss";
import MainBody from "./components/mainBody/mainBody";
import http from './services/httpServices';
import  config  from "./config.json";
import Notiflix from 'notiflix';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await http.get(config.apiEndpoint);
        setData(response);
      } catch (error: any) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj);
    console.log(post);
  };

  const handleDelete = async (post: any) => {
    Notiflix.Report.success(
      'Notiflix Success',
      '"Do not try to become a person of success but try to become a person of value." <br/><br/>- Albert Einstein',
      'Okay',
      );
    console.log("start");
    const originalPosts = data;
    const posts = data.filter((p: any) => p.id !== post.id);
    setData(posts);
    try {
      await http.delete(config.apiEndpoint + "/" + post.id);
    } catch (ex: any) {
      if (ex.response && ex.response.status === 404) {
        alert("The post has already deleted");
      } else {
        console.log(ex);
        alert("An unexpected error occured.");
      }

      setData(originalPosts);
      console.log("complete");
    }
    console.log("complete");
  };

  return (
    <div className="App">
      <div className="app__wrapper">
        <div>
          {loading && <div>Loading</div>}
          {!loading && (
            <div>
              <h2>Doing stuff with data</h2>
              {data.map((item: any) => (
                <div>
                  <p>{item.title}</p>
                  <button
                    onClick={() => {
                      handleDelete(item);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
          <button onClick={handleAdd}>Add</button>
        </div>
        <Sidebar />
        <MainBody />
      </div>
    </div>
  );
}

export default App;
