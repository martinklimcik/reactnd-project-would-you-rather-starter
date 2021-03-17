import { Component } from "react";
import "./components.css";

const TabButton = (props) => {
  return (
    <button
      className="tab-button"
      type="button"
      onClick={() => {
        props.changeTab(props.label);
      }}
    >
      {props.label}
    </button>
  );
};

class TabPanel extends Component {
  state = { activeTab: this.props.children[0].props.label };

  changeTab = (tabLabel) => {
    this.setState({ activeTab: tabLabel });
  };

  render() {
    //console.log(this.props);
    return (
      <div className="tab-panel">
        <ol className="tab-buttons">
          {this.props.children.map((tab) => (
            <TabButton
              key={tab.props.label}
              label={tab.props.label}
              changeTab={this.changeTab}
            />
          ))}
        </ol>
        <div className="tab-content">
          {this.props.children.map((tab) => {
            return tab.props.label === this.state.activeTab
              ? tab.props.children
              : undefined;
          })}
        </div>
      </div>
    );
  }
}

export default TabPanel;
