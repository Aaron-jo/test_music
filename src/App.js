import React, { useState, useRef, useEffect } from "react";
import { Form, InputNumber, Button, Layout } from "antd";
import "./App.css";
import logo from "./statics/logo.jpg";
import random from "lodash/random";

const { Header, Footer, Content } = Layout;

const genData = () => {
  const data = [];
  for (let index = 1; index <= 5; index++) {
    data.push({
      music_name: `乐曲${index}`,
      url: require(`./statics/demo_${index}.m4a`),
      score: null,
    });
  }
  return data;
};

function App() {
  const [viewArr, setViewArr] = useState(() => genData());
  const audioRef = useRef(null);
  useEffect(() => {
    if (audioRef && audioRef.current) {
      console.log(viewArr);
    }
  }, [audioRef, viewArr]);
  console.log(viewArr, random(1, 6));
  return (
    <Form>
      <Layout className="App">
        <Header className="header">
          <div className="logoWrapper">
            <img
              src={logo}
              alt="logo"
              style={{ height: "100%", width: "100%" }}
            />
            <h1 className="headTitle">视奏乐曲评分平台</h1>
          </div>
        </Header>
        <Content className="container">
          {viewArr.map((item) => (
            <div className="listWrappr" key={item.music_name}>
              <div className="musicWrapper">
                <div>
                  <p>示范音频：{item.music_name}</p>
                  <audio src={item.url} ref={audioRef} controls />
                </div>
                <div>
                  <p>视奏音频：{item.music_name}</p>
                  <audio
                    src={viewArr[random(0, 4)].url}
                    ref={audioRef}
                    controls
                  />
                </div>
              </div>
              <div className="formItemWrapper">
                <p>请试听后评分</p>
                <InputNumber
                  placeholder="请填入分数, 满分10分"
                  style={{ width: 200 }}
                  max={10}
                  min={0}
                />
              </div>
            </div>
          ))}
        </Content>
        <Footer className="footer">
          <Button type="primary">提交</Button>
        </Footer>
      </Layout>
    </Form>
  );
}

export default App;
