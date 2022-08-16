import { useEffect, useState } from "react";
import "./App.css";
import "./loader.css";
import axios from "axios";
import Modal from "./components/Modal";

function App() {
  const [peopleData, setPeopleData] = useState({
    loading: false,
    error: false,
    data: [],
  });

  const [peopleSearchData, setPeopleSearchData] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [currentObj, setCurrentObj] = useState(null);

  const toggleModal = () => setShowModal(!showModal);

  const tableColumns = [
    { name: "Username", key: "username", hide: false },
    { name: "uuid", key: "uuid", hide: true },
    { name: "Phone", key: "phone", hide: true },
    { name: "Email", key: "email", hide: false },
    { name: "City", key: "city", hide: false },
  ];

  useEffect(() => {
    setPeopleData({
      ...peopleData,
      loading: true,
    });
    axios
      .get("https://randomuser.me/api/?results=60")
      .then((res) => {
        setPeopleData({
          data: [...res.data.results],
          error: false,
          loading: false,
          index: 0,
        });
        setPeopleSearchData([...res.data.results]);
      })
      .catch((err) => {
        setPeopleData({
          data: [],
          error: true,
          loading: false,
        });
      });
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText) {
        const filterData = peopleSearchData.filter(
          (ele) =>
            ele.name.first.toLowerCase().includes(searchText) ||
            ele.name.last.toLowerCase().includes(searchText)
        );
        setPeopleSearchData([...filterData]);
      } else {
        setPeopleSearchData([...peopleData.data]);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  return (
    <div className="App">
      {peopleData.loading ? (
        <div className="loader">Loading...</div>
      ) : peopleData.error ? (
        <h1>Some Error Occured</h1>
      ) : peopleData.length === 0 ? (
        <h1>No Data Available</h1>
      ) : (
        <>
          {currentObj && (
            <Modal
              toggleModal={toggleModal}
              userData={currentObj}
              showModal={showModal}
            />
          )}
          <div className="table-cont">
            <div className="search-input">
              <input
                type="text"
                value={searchText}
                placeholder="Search by name"
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </div>
            <table>
              <div className="table-body-cont">
                <thead>
                  <tr>
                    {tableColumns &&
                      tableColumns.map((ele) => (
                        <th>
                          <div
                            className={`header-col ${
                              ele.hide ? "hidecol" : ""
                            }`}
                          >
                            {ele.name}
                          </div>
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {peopleSearchData &&
                    peopleSearchData.map(
                      ({
                        login,
                        name,
                        phone,
                        picture,
                        location,
                        email,
                        ...ele
                      }) => (
                        <tr
                          onClick={() => {
                            toggleModal();
                            setCurrentObj({
                              login,
                              name,
                              phone,
                              picture,
                              location,
                              email,
                              ...ele,
                            });
                          }}
                        >
                          <td>
                            <div className="data-col username">
                              <div className="user-img">
                                <img src={picture?.large} alt="logo" />
                              </div>
                              <div>{`${name?.first} ${name?.last}`}</div>
                            </div>
                          </td>
                          <td>
                            <div className="hidecol">{login?.uuid}</div>
                          </td>
                          <td>
                            <div className="hidecol">{phone}</div>
                          </td>
                          <td>
                            <div>{email}</div>
                          </td>
                          <td>
                            <div>{location?.city}</div>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </div>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
