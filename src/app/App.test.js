import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import Nav from "../header/Nav";
import Subreddits from "../subreddits/Subreddits";
import ArticleList from '../articles/ArticleList';

const { shallow, mount } = require("enzyme");

describe("App component shallow rendering", () => {
  it("renders without crashing", () => {
    shallow(<App />);
  });

  it("renders one <Nav /> component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Nav)).toHaveLength(1);
  });

  it("renders one <Subreddits /> component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Subreddits)).toHaveLength(1);
  });

  it("renders one <ArticleList / component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(ArticleList)).toHaveLength(1);
  })

});

describe("App full DOM rendering", () => {
  it("renders without crashing", () => {
    mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
