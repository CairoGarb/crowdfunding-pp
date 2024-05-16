import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./Header.css";

export const Header = () => {
  // Menus
  const [menuMobile, setMenuMobile] = useState(false);
  const [backProject, setBackProject] = useState(false);
  const [isSelected, setIsSelected] = useState("");
  const [thankYou, setThankYou] = useState(false);
  const [maxBacked, setMaxBacked] = useState(false);

  // Values
  const [bambooValue, setBambooValue] = useState(10);
  const [bambooMinPrice] = useState(25);
  const [bambooOutOfStock, setBambooOutOfStock] = useState(false);

  const [blackEditionValue, setBlackEditionValue] = useState(5);
  const [blackEditionMinPrice] = useState(75);
  const [blackEditionOutOfStock, setBlackEditionOutOfStock] = useState(false);

  const [mahoganyValue, setMahoganyValue] = useState(3);
  const [mahoganyMinPrice] = useState(200);
  const [mahoganyOutOfStock, setMahoganyOutOfStock] = useState(false);

  const [noRewardMinPrice] = useState(1);

  const [totalBacked, setTotalBacked] = useState(0);
  const [totalBackers, setTotalBackers] = useState(0);
  const [backed] = useState(100000);

  const [pledgeAmount, setPledgeAmount] = useState(Number);
  const [error, setError] = useState("");

  const [bookmark, setBookmark] = useState(false);

  // Responsive
  const isMobile = useMediaQuery({ maxWidth: 750 });

  // Menu where the money is pledged
  const backThisProject = () => {
    if (totalBacked < 100000) {
      setBackProject(true);
      if (isMobile) {
        window.scrollTo(0, 0);
      } else {
        window.scrollTo(0, 100);
      }
    } else {
      setMaxBacked(true);
      window.scrollTo(0, 0);
    }
  };

  // Close the backThisProject menu
  const closeBackThisProject = () => {
    setBackProject(false);
    setIsSelected("");
    setError("");
  };

  // Open and close menu on mobile
  const handleMenuMobile = () => {
    setMenuMobile(!menuMobile);
  };

  // Input change
  const handleRadioChange = (value: any) => {
    setIsSelected(value);
    setPledgeAmount(0);
    setError("");
  };

  // Validation of the pledge
  const continuePledge = () => {
    const pledge = Number(pledgeAmount);

    if (totalBacked + pledge > 100000) {
      setError("The pledge exceeds the maximum funding goal");
      return;
    }

    if (
      (isSelected === "bambooStand" &&
        pledge >= bambooMinPrice &&
        bambooValue > 0) ||
      (isSelected === "blackEdition" &&
        pledge >= blackEditionMinPrice &&
        blackEditionValue > 0) ||
      (isSelected === "mahoganyEdition" &&
        pledge >= mahoganyMinPrice &&
        mahoganyValue > 0) ||
      (isSelected === "noReward" && pledge >= noRewardMinPrice)
    ) {
      setTotalBacked((totalBacked) => totalBacked + pledge);
      setTotalBackers((totalBackers) => totalBackers + 1);

      if (isSelected === "bambooStand") {
        setBambooValue((bambooValue) => bambooValue - 1);
      } else if (isSelected === "blackEdition") {
        setBlackEditionValue((blackEditionValue) => blackEditionValue - 1);
      } else if (isSelected === "mahoganyEdition") {
        setMahoganyValue((mahoganyValue) => mahoganyValue - 1);
      }

      closeBackThisProject();
      setThankYou(true);
      window.scrollTo(0, 0);
    } else if (
      (isSelected === "noReward" && pledgeAmount >= 1) ||
      (isSelected === "bambooStand" && pledgeAmount >= 25) ||
      (isSelected === "blackEdition" && pledgeAmount >= 75) ||
      (isSelected === "mahoganyEdition" && pledgeAmount >= 200)
    ) {
      setError("");
    } else {
      setError("The minimum value was not achieved");
    }
  };

  // Close the Thank You Message after the money pledged
  const closeThankYouMessage = () => {
    setThankYou(false);
  };

  // Close the Max Backed Message
  const closeMaxBackedMessage = () => {
    setMaxBacked(false);
  };

  // Check the values of each plan, if its 0, shows Out of Stock
  useEffect(() => {
    if (bambooValue === 0) {
      setBambooOutOfStock(true);
    }
  }, [bambooValue]);

  useEffect(() => {
    if (blackEditionValue === 0) {
      setBlackEditionOutOfStock(true);
    }
  }, [blackEditionValue]);

  useEffect(() => {
    if (mahoganyValue === 0) {
      setMahoganyOutOfStock(true);
    }
  }, [mahoganyValue]);

  // Selected Reward button, he opens the backThisProject section but with the plan already selected
  const handleBambooReward = () => {
    if (!bambooOutOfStock) {
      setIsSelected("bambooStand");
      backThisProject();
      if (isMobile) {
        window.scrollTo(0, 300);
      } else {
        window.scrollTo(0, 200);
      }
    }
  };

  const handleBlackEditionReward = () => {
    if (!blackEditionOutOfStock) {
      setIsSelected("blackEdition");
      backThisProject();
      if (isMobile) {
        window.scrollTo(0, 600);
      } else {
        window.scrollTo(0, 400);
      }
    }
  };

  const handleMahoganyReward = () => {
    if (!mahoganyOutOfStock) {
      setIsSelected("mahoganyEdition");
      backThisProject();
      if (isMobile) {
        window.scrollTo(0, 900);
      } else {
        window.scrollTo(0, 500);
      }
    }
  };

  // Bookmark button action
  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  // Progress Bar
  const progressPercentage = (totalBacked / backed) * 100;

  return (
    <section className="headerContainer">
      {menuMobile && <div className="overlay"></div>}
      {backProject && <div className="overlay"></div>}
      {thankYou && <div className="overlay" />}
      {maxBacked && <div className="overlay"></div>}
      {/* Navigation Section */}
      <nav>
        <div className="logo">
          <img src="./logo.svg" alt="logo" />
        </div>
        {isMobile && (
          <div className="menuBar" onClick={handleMenuMobile}>
            <i className={`fa-solid ${menuMobile ? "fa-x" : "fa-bars"}`}></i>
          </div>
        )}
        <div className={`menuOpen ${menuMobile ? "active" : ""}`}>
          <ul>
            <li>About</li>
            <hr />
            <li>Discover</li>
            <hr />
            <li>Get Started</li>
          </ul>
        </div>
      </nav>

      {/* Description of Project */}
      <section className="projectDescription">
        <div className="logoMastercraft">
          <img src="./logo-mastercraft.svg" alt="mastercraft logo" />
        </div>
        <div className="masterTitle">
          <h1>Mastercraft Bamboo Monitor Riser</h1>
        </div>
        <div className="masterSub">
          <p>
            A beautifully handcrafted monitor stand to reduce neck and eye
            strain
          </p>
        </div>
        <div className="btnBook">
          <div className="masterButton">
            <button onClick={backThisProject}>Back this project</button>
          </div>
          <div className="masterBook" onClick={handleBookmark}>
            <i
              className={`fa-solid fa-bookmark ${bookmark ? "active" : ""}`}
            ></i>
            {isMobile ? (
              <p></p>
            ) : (
              <p className={`${bookmark ? "textActive" : ""}`}>
                {bookmark ? "Bookmarked" : "Bookmark"}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Status of Project */}
      <section className="statusContainer">
        <div className="backed">
          <div className="totalBacked">
            ${totalBacked.toLocaleString("en-US")}
          </div>
          <div className="ofTotal">
            of {backed.toLocaleString("en-US")} backed
          </div>
        </div>
        <hr />
        <div className="backers">
          <div className="totalBackers">
            {totalBackers.toLocaleString("en-US")}
          </div>
          <div className="totalBackersSub">total backers</div>
        </div>
        <hr />
        <div className="days">
          <div className="totalDays">60</div>
          <div className="daysLeft">days left</div>
        </div>
        <div className="progressBarContainer">
          <div
            className="progressBar"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor: "#3cb4ac",
              height: "100%",
            }}
          ></div>
        </div>
      </section>

      {/* About Project */}
      <section className="aboutContainer">
        <div className="aboutTitle">
          <h2>About this project</h2>
        </div>
        <div className="aboutDescription">
          <p>
            The Mastercraft Bamboo Monitor Riser is a sturdy and stylish
            platform that elevates your screen to a more comfortable viewing
            height. Placing your monitor at eye level has the potential to
            improve your posture and make you more comfortable at work, helping
            you stay focused on the task at hand.
          </p>
          <p>
            Featuring artisan craftmanship, the simplicity of design creates
            extra desk space below your computer to allow notepads, pens, and
            USB sticks to be stored under the stand.
          </p>
        </div>
        {/* Project Plans */}
        <div className="plans">
          <div className="bambooStand">
            <div className={`bsTitle ${bambooOutOfStock ? "oosTitle" : ""}`}>
              <h3>Bamboo Stand</h3>
              <div
                className={`moneyPledged ${
                  bambooOutOfStock ? "oosMoneyPledged" : ""
                }`}
              >
                <p>Pledge $25 or more</p>
              </div>
            </div>
            <div className="bsDesc">
              <p className={`${bambooOutOfStock ? "oosDesc" : ""}`}>
                You get an ergonomic stand made of natural bamboo. You've helped
                us launch our promotional campaign, and you'll be added to a
                special Backer member list.
              </p>
            </div>
            <div className="leftAndButton">
              <div className="bsLeft">
                <p
                  className={`numberLeft ${
                    bambooOutOfStock ? "oosLeftNumber" : ""
                  }`}
                >
                  {bambooValue}
                </p>
                <span
                  className={`leftText ${
                    bambooOutOfStock ? "oosLeftText" : ""
                  }`}
                >
                  left
                </span>
              </div>
              <div className="buttonControl">
                <button
                  className={`bsButton ${bambooOutOfStock ? "oosButton" : ""}`}
                  onClick={handleBambooReward}
                >
                  {bambooOutOfStock ? (
                    <span>Out of Stock</span>
                  ) : (
                    <span>Select Reward</span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="blackEdition">
            <div
              className={`beTitle ${blackEditionOutOfStock ? "oosTitle" : ""}`}
            >
              <h3>Black Edition Stand</h3>
              <div
                className={`moneyPledged ${
                  blackEditionOutOfStock ? "oosMoneyPledged" : ""
                }`}
              >
                <p>Pledge $75 or more</p>
              </div>
            </div>
            <div className="beDesc">
              <p className={`${blackEditionOutOfStock ? "oosDesc" : ""}`}>
                You get a Black Special Edition computer stand and a personal
                thank you. You'll be added to our Backer member list. Shipping
                is included.
              </p>
            </div>
            <div className="leftAndButton">
              <div className="beLeft">
                <p
                  className={`numberLeft ${
                    blackEditionOutOfStock ? "oosLeftNumber" : ""
                  }`}
                >
                  {blackEditionValue}
                </p>
                <span
                  className={`leftText ${
                    blackEditionOutOfStock ? "oosLeftText" : ""
                  }`}
                >
                  left
                </span>
              </div>
              <div className="buttonControl">
                <button
                  className={`beButton ${
                    blackEditionOutOfStock ? "oosButton" : ""
                  }`}
                  onClick={handleBlackEditionReward}
                >
                  {blackEditionOutOfStock ? (
                    <span>Out of Stock</span>
                  ) : (
                    <span>Select Reward</span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="mahogany">
            <div className={`mhTitle ${mahoganyOutOfStock ? "oosTitle" : ""}`}>
              <h3>Mahogany Special Edition</h3>
              <div className="moneyPledged">
                <p className={`${mahoganyOutOfStock ? "oosMoneyPledged" : ""}`}>
                  Pledge $200 or more
                </p>
              </div>
            </div>
            <div className="mhDesc">
              <p className={` ${mahoganyOutOfStock ? "oosDesc" : ""}`}>
                You get two Special Edition Mahogany stands, a Backer T-Shirt,
                and a personal thank you. You'll be added to our Backer member
                list. Shipping is included.
              </p>
            </div>
            <div className="leftAndButton">
              <div className="mhLeft">
                <p
                  className={`numberLeft ${
                    mahoganyOutOfStock ? "oosLeftNumber" : ""
                  }`}
                >
                  {mahoganyValue}
                </p>
                <span
                  className={`leftText ${
                    mahoganyOutOfStock ? "oosLeftText" : ""
                  }`}
                >
                  left
                </span>
              </div>
              <div className="buttonControl">
                <button
                  className={`mhButton ${
                    mahoganyOutOfStock ? "oosButton" : ""
                  }`}
                  onClick={handleMahoganyReward}
                >
                  {mahoganyOutOfStock ? (
                    <span>Out of Stock</span>
                  ) : (
                    <span>Select Reward</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu that open when 'Back this project' button is clicked */}
      {backProject && (
        <section className="btp">
          <div className="btpHeader">
            <p>Back this project</p>
            <i className="fa-solid fa-x" onClick={closeBackThisProject}></i>
          </div>
          <div className="btpSub">
            <p>
              Want to support us in bringing Mastercraft Bamboo Monitor Riser
              out in the world?
            </p>
          </div>
          <section className="btpPlan">
            <div className="btpRewards">
              <label htmlFor="reward"></label>
              <div className="buttonGroup">
                <div
                  className={`labelBtn ${
                    isSelected === "noReward" ? "selectedItem" : ""
                  }`}
                >
                  <label htmlFor="btpPlans">
                    {" "}
                    <input
                      type="radio"
                      id="bptPlans"
                      className="inputBox"
                      name="btpPlans"
                      value="noReward"
                      checked={isSelected === "noReward"}
                      onChange={() => handleRadioChange("noReward")}
                    />
                    <p
                      className="rewardName"
                      onClick={() => handleRadioChange("noReward")}
                    >
                      Pledge with no reward
                    </p>
                  </label>
                  <div className="labelText">
                    <p>
                      Choose to support us without a reward if you simply
                      believe in our project. As a backer, you will be signed up
                      to receive product updates via email.
                    </p>
                  </div>
                  {isSelected === "noReward" && (
                    <div className="selected">
                      <label htmlFor="pledge">
                        <span>Enter your pledge</span>
                        <div className="selectedButtons">
                          <input
                            type="number"
                            id="pledge"
                            className="pledgeBox"
                            name="pledge"
                            placeholder="$"
                            onChange={(e) =>
                              setPledgeAmount(e.target.valueAsNumber)
                            }
                          />
                          <button onClick={continuePledge}>Continue</button>
                          <div className="error">{error}</div>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
                <div
                  className={`labelBtn ${
                    isSelected === "bambooStand" ? "selectedItem" : ""
                  }`}
                >
                  <label htmlFor="btpPlans">
                    {" "}
                    <input
                      type="radio"
                      id="bptPlans"
                      className="inputBox"
                      name="btpPlans"
                      value="bambooStand"
                      checked={isSelected === "bambooStand"}
                      onChange={() => handleRadioChange("bambooStand")}
                      disabled={bambooOutOfStock ? true : false}
                    />
                    <p
                      className={`${bambooOutOfStock ? '' : 'rewardName'} ${
                        bambooOutOfStock ? "oosTitle" : ""
                      }`}
                      onClick={() => {
                        if (!bambooOutOfStock) {
                          handleRadioChange("bambooStand");
                        }
                      }}
                    >
                      Bamboo Stand{" "}
                      <span
                        className={`moneyPledged ${
                          bambooOutOfStock ? "oosMoneyPledged" : ""
                        }`}
                      >
                        Pledge $25 or more
                      </span>
                    </p>
                  </label>
                  <div className="labelText">
                    <p className={`${bambooOutOfStock ? "oosDesc" : ""}`}>
                      You get an ergonomic stand made of natural bamboo. You've
                      helped us launch our promotional campaign, and you'll be
                      added to a special Backer member list.
                    </p>
                    <p className="numberLeft desktop">
                      <p
                        className={`${bambooOutOfStock ? "oosLeftNumber" : ""}`}
                      >
                        {bambooValue}
                      </p>{" "}
                      <span
                        className={`leftText ${
                          bambooOutOfStock ? "oosLeftText" : ""
                        }`}
                      >
                        left
                      </span>
                    </p>
                  </div>
                  {isSelected === "bambooStand" && (
                    <div className="selected" id="bsSelected">
                      <label htmlFor="pledge">
                        <span>Enter your pledge</span>
                        <div className="selectedButtons">
                          <input
                            type="number"
                            id="pledge"
                            className="pledgeBox"
                            name="pledge"
                            placeholder="$"
                            onChange={(e) =>
                              setPledgeAmount(e.target.valueAsNumber)
                            }
                          />
                          <button onClick={continuePledge}>Continue</button>
                          <div className="error">{error}</div>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
                <div
                  className={`labelBtn ${
                    isSelected === "blackEdition" ? "selectedItem" : ""
                  }`}
                >
                  <label htmlFor="btpPlans">
                    {" "}
                    <input
                      type="radio"
                      id="bptPlans"
                      className="inputBox"
                      name="btpPlans"
                      value="blackEdition"
                      checked={isSelected === "blackEdition"}
                      onChange={() => handleRadioChange("blackEdition")}
                      disabled={blackEditionOutOfStock ? true : false}
                    />
                    <p
                      className={`${blackEditionOutOfStock ? '' : 'rewardName'} ${
                        blackEditionOutOfStock ? "oosTitle" : ""
                      }`}
                      onClick={() => {
                        if (!blackEditionOutOfStock) {
                          handleRadioChange("blackEdition");
                        }
                      }}
                    >
                      Black Edition Stand{" "}
                      <span
                        className={`moneyPledged ${
                          blackEditionOutOfStock ? "oosMoneyPledged" : ""
                        }`}
                      >
                        Pledge $75 or more
                      </span>
                    </p>
                  </label>
                  <div className="labelText">
                    <p className={`${blackEditionOutOfStock ? "oosDesc" : ""}`}>
                      You get a Black Special Edition computer stand and a
                      personal thank you. You'll be added to our Backer member
                      list. Shipping is included.
                    </p>
                    <p
                      className={`numberLeft desktop ${
                        blackEditionOutOfStock ? "oosLeftNumber" : ""
                      }`}
                    >
                      {blackEditionValue}{" "}
                      <span
                        className={`leftText ${
                          blackEditionOutOfStock ? "oosLeftText" : ""
                        }`}
                      >
                        left
                      </span>
                    </p>
                  </div>
                  {isSelected === "blackEdition" && (
                    <div className="selected">
                      <label htmlFor="pledge">
                        <span>Enter your pledge</span>
                        <div className="selectedButtons">
                          <input
                            type="number"
                            id="pledge"
                            className="pledgeBox"
                            name="pledge"
                            placeholder="$"
                            onChange={(e) =>
                              setPledgeAmount(e.target.valueAsNumber)
                            }
                          />
                          <button onClick={continuePledge}>Continue</button>
                          <div className="error">{error}</div>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
                <div
                  className={`labelBtn ${
                    isSelected === "mahoganyEdition" ? "selectedItem" : ""
                  }`}
                >
                  <label htmlFor="btpPlans">
                    {" "}
                    <input
                      type="radio"
                      id="bptPlans"
                      className="inputBox"
                      name="btpPlans"
                      value="mahoganyEdition"
                      checked={isSelected === "mahoganyEdition"}
                      disabled={mahoganyOutOfStock ? true : false}
                      onChange={() => handleRadioChange("mahoganyEdition")}
                    />
                    <p
                      className={`${mahoganyOutOfStock ? "" : "rewardName"} ${
                        mahoganyOutOfStock ? "oosTitle" : ""
                      }`}
                      onClick={() => {
                        if (!mahoganyOutOfStock) {
                          handleRadioChange("mahoganyEdition");
                        }
                      }}
                    >
                      Mahogany Special Edition{" "}
                      <span
                        className={`moneyPledged ${
                          mahoganyOutOfStock ? "oosMoneyPledged" : ""
                        }`}
                      >
                        Pledge $200 or more
                      </span>
                    </p>
                  </label>
                  <div className="labelText">
                    <p className={`${mahoganyOutOfStock ? "oosDesc" : ""}`}>
                      You get two Special Edition Mahogany stands, a backer
                      T-Shirt, and a personal thank you. You'll be added to our
                      Backer member list. Shipping is included.
                    </p>
                    <p
                      className={`numberLeft desktop ${
                        mahoganyOutOfStock ? "oosLeftNumber" : ""
                      }`}
                    >
                      {mahoganyValue}{" "}
                      <span
                        className={`leftText ${
                          mahoganyOutOfStock ? "oosLeftText" : ""
                        }`}
                      >
                        left
                      </span>
                    </p>
                  </div>
                  {isSelected === "mahoganyEdition" && (
                    <div className="selected">
                      <label htmlFor="pledge">
                        <span>Enter your pledge</span>
                        <div className="selectedButtons">
                          <input
                            type="number"
                            id="pledge"
                            className="pledgeBox"
                            name="pledge"
                            placeholder="$"
                            onChange={(e) =>
                              setPledgeAmount(e.target.valueAsNumber)
                            }
                          />
                          <button onClick={continuePledge}>Continue</button>
                          <div className="error">{error}</div>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </section>
      )}
      {/* Thank You Message */}
      {thankYou && (
        <section className="ty">
          <div className="tyIcon">
            <img src="./icon-check.svg" alt="icon check" />
          </div>
          <h2>Thanks for you support!</h2>
          <p>
            Your pledge bring us one step closer to sharing Mastercraft Bamboo
            Monitor Riser worldwide. You will get an email once our campaign is
            completed.
          </p>
          <button onClick={closeThankYouMessage}>Got it!</button>
        </section>
      )}
      {/* Thank You Message when project already has the max support */}
      {maxBacked && (
        <section className="mb">
          <div className="mbIcon">
            <img src="./icon-check.svg" alt="icon check" />
          </div>
          <h2>Thanks for you support!</h2>
          <p>
            This project already achieved his maximum support. But we thank you
            for trying to help us.
          </p>
          <button onClick={closeMaxBackedMessage}>Got it!</button>
        </section>
      )}
    </section>
  );
};
