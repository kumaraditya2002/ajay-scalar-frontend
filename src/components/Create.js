import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  InputGroup,
  Form,
  Accordion,
  ListGroup,
  Button,
  Modal,
} from "react-bootstrap";
import data from "../users.json";
import Alert from "./Alert";
import Loader from "./Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { backendApi } from "../urlConfig.js";

const Create = () => {
  const [color, setColor] = useState("");
  const [text, setText] = useState("");
  const [show, setShow] = useState(0);
  const [load, setLoad] = useState(0);
  const [inv, setInv] = useState([]);
  const [modal, setModal] = useState(0);
  const [irname, setIrname] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [sTime, setStime] = useState("");
  const [eTime, setEtime] = useState("");
  
  const riname = useRef(null);
  const rname = useRef(null);
  const rdate = useRef(null);
  const rstTime = useRef(null);
  const renTime = useRef(null);
  
  useEffect(() => {
    const fetchInv = async () => {
      const rsp = await fetch(`${backendApi}/getInterviews`);
      const data = await rsp.json();
      if (data.ok) {
        setInv(data.inv);
        // console.log(data.inv);
      } else {
        setColor("red");
        setText("Something went wrong");
        setShow(1);
        setTimeout(() => {
          setShow(0);
        }, 2000);
      }
    };
    fetchInv();
  }, []);

  useEffect(() => {
    let arr = [];
    localStorage.setItem("part", JSON.stringify(arr));
    localStorage.setItem('sId','');
  }, []);

  const scrollBar = {
    overflow: "hidden",
    overflowY: "scroll",
    height: "80vh",
    textAlign: "center",
  };
  const scrollBar1 = {
    overflow: "hidden",
    overflowY: "scroll",
    height: "70vh",
    textAlign: "center",
  };
  const header = {
    textAlign: "center",
    backgroundColor: "rgb(137, 207, 240)",
    color: "white",
    paddingTop: "0.7rem",
    paddingBottom: "0.7rem",
    letterSpacing: "2px",
  };
  const handleClick = async (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage["part"]);

    if (users.length < 2) {
      setColor("red");
      setText("Choose atleast 2 participants");
      setShow(1);
      setTimeout(() => {
        setShow(0);
      }, 2000);
    } else {
      setLoad(1);
      const rsp = await fetch(`${backendApi}/addInterview`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          iname: irname,
          name: name,
          date: date,
          st: sTime,
          en: eTime,
          users,
        }),
      });
      const data = await rsp.json();
      setLoad(0);
      if (data.ok) {
        setColor("green");
        setText("Interview sheduled successfully");
        setShow(1);
        setTimeout(() => {
          setShow(0);
        }, 2000);
        let arr = [...inv];
        arr.push(data.data);
        setInv(arr);
      } else {
        setColor("red");
        setText(data.err);
        setShow(1);
        setTimeout(() => {
          setShow(0);
        }, 2000);
      }
    }
  };

  const handleChange = (e) => {
    let ele = e.target.parentElement.parentElement;
    let name = ele.childNodes[0].innerText;
    let email = ele.childNodes[1].innerText;
    let user = { name, email };
    let arr = JSON.parse(localStorage.getItem("part"));
    if (e.target.checked) {
      arr.push(user);
    } else {
      let idx = arr.findIndex((e, i) => e.name === name && e.email === email);
      arr.splice(idx, 1);
    }
    localStorage.setItem("part", JSON.stringify(arr));
  };

  const handleChangeIname = (e) => {
    setIrname(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };
  const handleChangeSt = (e) => {
    setStime(e.target.value);
  };
  const handleChangeEn = (e) => {
    setEtime(e.target.value);
  };
  const handleSubmitModal = async (e) => {
    e.preventDefault();
    let iname=riname.current.value;
    let date=rdate.current.value;
    let name=rname.current.value;
    let st=rstTime.current.value;
    let en=renTime.current.value;
    let id=localStorage['sId']
    
    const rsp=await fetch(`${backendApi}/updateInterview`,{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({iname,date,name,st,en,id})
    })
    const data = await rsp.json();
      setLoad(0);
      if (data.ok) {
        setColor("green");
        setText("Interview updated successfully");
        setShow(1);
        setTimeout(() => {
          setShow(0);
        }, 2000);
        
        setInv(data.up);
        console.log(data.up)
      } else {
        setColor("red");
        setText(data.err);
        setShow(1);
        setTimeout(() => {
          setShow(0);
        }, 2000);
      }
  };
  return (
    <>
      <Modal
        show={modal}
        onHide={() => setModal(!modal)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmitModal}>
            <InputGroup className="mt-3 mb-4">
              <InputGroup.Text id="basic-addon6">
                Interview Name
              </InputGroup.Text>
              <Form.Control
                placeholder="Enter Here"
                aria-label="iname1"
                aria-describedby="basic-addon6"
                // value={riname?riname.current.innerText:''}
                ref={riname}
              />
            </InputGroup>

            <InputGroup className="mt-3 mb-4">
              <InputGroup.Text id="basic-addon7">
                Interviewer Name
              </InputGroup.Text>
              <Form.Control
                placeholder="Enter Here"
                aria-label="irname1"
                aria-describedby="basic-addon7"
                // value={rname?rname.current.innerText:''}
                ref={rname}
              />
            </InputGroup>
            <InputGroup className="mt-3 mb-4">
              <InputGroup.Text id="basic-addon8">
                Date of Interview
              </InputGroup.Text>
              <Form.Control
                type="date"
                name="toi"
                placeholder="Select time"
                aria-label="irname3"
                aria-describedby="basic-addon8"
                // value={rdate?rdate.current.innerText:''}
                ref={rdate}
              />
            </InputGroup>
            <InputGroup className="mt-3 mb-4">
              <InputGroup.Text id="basic-addon9">Start Time</InputGroup.Text>
              <Form.Control
                type="time"
                name="st"
                placeholder="Start time"
                aria-label="st"
                aria-describedby="basic-addon9"
                // value={rTime?rTime.current.innerText.split('-')[0]:''}
                ref={rstTime}
              />
            </InputGroup>
            <InputGroup className="mt-3 mb-4">
              <InputGroup.Text id="basic-addon66">End Time</InputGroup.Text>
              <Form.Control
                type="time"
                name="en"
                placeholder="End time"
                aria-label="en"
                aria-describedby="basic-addon66"
                // value={rTime?rTime.current.innerText.split('-')[1]:''}
                ref={renTime}
              />
            </InputGroup>

            {load ? (
              <Button
                variant="bg-outline-success"
                disabled={true}
                style={{ width: "71.77px", height: "38px" }}
              >
                <Loader size="lg" />
              </Button>
            ) : (
              <button className="btn btn-outline-primary " type="submit">
                Update
              </button>
            )}

            <button className="btn btn-danger mx-1" type="reset">
              Reset
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <div style={header}>
        <h3>INTERVIEW PORTAL</h3>
      </div>
      <div className="container-fluid">
        {show ? <Alert text={text} color={color} /> : <div></div>}

        <div className="row">
          <div className="col-sm-3 mt-3 mx-3" style={scrollBar}>
            <h4 style={{ textAlign: "center" }}>Choose Participants</h4>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((e, i) => {
                  return (
                    <tr key={i}>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>
                        <input type="checkbox" onClick={handleChange} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className="col-sm-3">
            <form onSubmit={handleClick}>
              <h4 className="mt-3" style={{ textAlign: "center" }}>
                Create Interview
              </h4>
              <InputGroup className="mt-3 mb-4">
                <InputGroup.Text id="basic-addon1">
                  Interview Name
                </InputGroup.Text>
                <Form.Control
                  placeholder="Enter Here"
                  aria-label="iname"
                  aria-describedby="basic-addon1"
                  value={irname}
                  onChange={handleChangeIname}
                />
              </InputGroup>

              <InputGroup className="mt-3 mb-4">
                <InputGroup.Text id="basic-addon2">
                  Interviewer Name
                </InputGroup.Text>
                <Form.Control
                  placeholder="Enter Here"
                  aria-label="irname"
                  aria-describedby="basic-addon2"
                  value={name}
                  onChange={handleChangeName}
                />
              </InputGroup>
              <InputGroup className="mt-3 mb-4">
                <InputGroup.Text id="basic-addon3">
                  Date of Interview
                </InputGroup.Text>
                <Form.Control
                  type="date"
                  name="toi"
                  placeholder="Select time"
                  aria-label="irname"
                  aria-describedby="basic-addon3"
                  value={date}
                  onChange={handleChangeDate}
                />
              </InputGroup>
              <InputGroup className="mt-3 mb-4">
                <InputGroup.Text id="basic-addon4">Start Time</InputGroup.Text>
                <Form.Control
                  type="time"
                  name="st"
                  placeholder="Start time"
                  aria-label="st"
                  aria-describedby="basic-addon4"
                  value={sTime}
                  onChange={handleChangeSt}
                />
              </InputGroup>
              <InputGroup className="mt-3 mb-5">
                <InputGroup.Text id="basic-addon5">End Time</InputGroup.Text>
                <Form.Control
                  type="time"
                  name="en"
                  placeholder="End time"
                  aria-label="en"
                  aria-describedby="basic-addon5"
                  value={eTime}
                  onChange={handleChangeEn}
                />
              </InputGroup>
              <div style={{ width: "50%", margin: "auto" }}>
                {load ? (
                  <Button
                    variant="bg-outline-success"
                    disabled={true}
                    style={{ width: "71.77px", height: "38px" }}
                  >
                    <Loader size="lg" />
                  </Button>
                ) : (
                  <button
                    className="btn btn-outline-primary my-4"
                    type="submit"
                  >
                    Create
                  </button>
                )}

                <button className="btn btn-danger mx-1" type="reset">
                  Reset
                </button>
              </div>
            </form>
          </div>
          <div className="col-sm-5">
            <h4 className="mt-3" style={{ textAlign: "center" }}>
              Upcoming Interviews
            </h4>
            <div style={scrollBar1}>
              <Accordion defaultActiveKey="0">
                {inv.length === 0 ? (
                  <h4>No interview sheduled</h4>
                ) : (
                  inv.map((e, i) => {
                    return (
                      <Accordion.Item eventKey={i}>
                        <Accordion.Header>
                          <div className="container">
                            <div className="row">
                              <div className="col-sm-2" >
                                {e.iname}
                              </div>
                              <div className="col-sm-2" >
                                {e.name}
                              </div>
                              <div className="col-sm-4" >
                                {e.st}-{e.en}
                              </div>
                              <div className="col-sm-3" >
                                {e.date}
                              </div>
                              <div className="col-sm-1">
                                <FontAwesomeIcon
                                  icon={faPencilSquare}
                                  style={{ color: "red" }}
                                  onClick={() => {setModal(!modal); localStorage['sId']=e._id}}
                                ></FontAwesomeIcon>
                              </div>
                            </div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <ListGroup>
                            {e.users.map((ue, ui) => {
                              return (
                                <ListGroup.Item key={ui}>
                                  <div className="container">
                                    <div className="row">
                                      <div className="col-sm-3">{ue.name}</div>
                                      <div className="col-sm-9">{ue.email}</div>
                                    </div>
                                  </div>
                                </ListGroup.Item>
                              );
                            })}
                          </ListGroup>
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                  })
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
