
import React from "react";
import validator from "validator";
//validator is extansion that i use to  validate  urls
class UrlList extends React.Component {

    constructor(props) {
        super(props)
        this.state = { urls: [], newValue: "", EditClicked: [] };
        this.onChange = this.onChange.bind(this)
        this.AddUrl = this.AddUrl.bind(this)
        this.SortList = this.SortList.bind(this)
        this.RemoveUrl = this.RemoveUrl.bind(this)
        this.EditUrl = this.EditUrl.bind(this)
        this.UpdateUrl = this.UpdateUrl.bind(this)

    }

    AddUrl() {
        let newUrl = [...this.state.urls, this.state.newValue]
        if (this.state.newValue === "") {
            return (
                alert("please Enter a Url")
            );
        }
        else {
            if (validator.isURL(this.state.newValue)) {
                if (this.state.urls.includes(this.state.newValue)) {
                    alert("this url is already exist please enter other")
                }
                else {
                    this.setState({ urls: newUrl, newValue: "", newaddUrl: "" })
                }
            }
            else {
                alert("Please Enter Valid Url")
            }

        }
    };


    onChange(e) {
        this.setState({ newValue: e.target.value })
    }

    SortList() {
        let tempsortlist = this.state.urls.sort((a, b) => {
            return a.urls > b.urls ? 1 : -1
        })
        this.setState({ urls: tempsortlist })
    }

    RemoveUrl(u) {
        let newList = this.state.urls.filter((url) => url !== u.target.value)
        this.setState({ urls: newList })
    }

    EditUrl(u) {
        this.setState({ EditClicked: [...this.state.EditClicked, u.target.name] })
    }

    UpdateUrl(u) {
        if (validator.isURL(this.state.newValue)) {
            let newlist = this.state.urls.filter((url) => url !== u.target.name)
            newlist.splice(u.target.value, 0, this.state.newValue)
            let neweditlist = this.state.EditClicked.filter(((url) => url !== u.target.name))
            this.setState({ urls: newlist, newValue: "", EditClicked: neweditlist })
        }
        else {
            return (
                alert("Please Enter Valid Address")
            );
        }

    }


    render() {
        return (
            <div>
                <input type="text"  placeholder="Enter url" onChange={this.onChange} />
                <button onClick={this.AddUrl}>Add</button>
                <button onClick={this.SortList}>Sort</button>
                <div>
                    <ul>
                        {this.state.urls.map((url, i) => {
                            return (<li key={url}>{url} <span></span>
                                <button value={url} onClick={this.RemoveUrl}>Remove</button>
                                {this.state.EditClicked.includes(url) === false && <button name={url} value={i} onClick={this.EditUrl}>Edit</button>}
                                <div>
                                    {this.state.EditClicked.includes(url) === true && <input value={this.NewUrl} onChange={this.onChange} type="text" placeholder="Enter New Url"></input>}
                                    {this.state.EditClicked.includes(url) === true && <button name={url} value={i} onClick={this.UpdateUrl} >Ok</button>}
                                </div>
                            </li>
                            )
                        })}
                    </ul>
                </div>
            </div>);
    };


}
export default UrlList




