import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import _ from "lodash";
import classNames from "classnames";
import Icon from "../Icon";
import IconTheme from "../Icon/IconTheme";
import IconType from "../Icon/IconType";
import Routes from "../../constants/Routes";
import styles from "./styles.module.scss";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import HomeSettings from "../HomeSettings";
import user from "store/reducer/user";

const MainMenu = ({
    opened,
    closeMobileMenu,
    openBetCount,
    openBets,
    totalWin,
    balance,
}) => {
    const [openSettings, setOpenSettings] = useState(false);

    let investedAmount = 0;

    const calculateInvestedAmount = () => {
        openBets.map((bet) => {
            return (investedAmount += Number(bet.investmentAmount));
        });
    };

    calculateInvestedAmount();

    const history = useHistory();

    const showSettingsHandler = () => {
        setOpenSettings(true);
    };

    const notShowSettingsHandler = () => {
        setOpenSettings(false);
    };

    const onClickGoToRoute = (destinationRoute) => {
        return () => {
            history.push(destinationRoute);
        };
    };

    const growth = 0;

    return (
        <div
            className={classNames(
                styles.menu,
                opened ? styles.menuOpened : null
            )}
        >
            <div className={styles.fundsContainer}>
                <div className={styles.overallFunds}>
                    <p className={styles.overallFundsHeadline}>OVERALL FUNDS</p>
                    <div className={styles.overallFundsAmount}>
                        <p className={styles.overallFundsTotal}>8800</p>
                        <p className={styles.overallFundsTitle}>EVNT</p>
                    </div>
                </div>
                <div className={styles.fundsSeperator} />
                <div className={styles.detailedFunds}>
                    <div className={styles.investedFunds}>
                        <div className={styles.investedFundsHeadline}>
                            <div className={styles.investedFundsDot} />
                            Invested Market Value
                        </div>
                        <div className={styles.investedFundsAmount}>
                            <p className={styles.investedFundsTotal}>
                                {balance}
                            </p>
                            <p className={styles.investedFundsTitle}>EVNT</p>
                        </div>
                        {growth > 0 ? (
                            <div className={styles.growthPositive}>
                                +{growth}
                            </div>
                        ) : growth < 0 ? (
                            <div className={styles.growthNegative}>
                                {growth}
                            </div>
                        ) : (
                            <div className={styles.growthNeutral}>
                                {growth} / 0%
                            </div>
                        )}
                        <div className={styles.originInvestedAmount}>{investedAmount} EVNT invested</div>
                    </div>
                    <div className={styles.liquidFunds}>
                        <div className={styles.liquidFundsHeadline}>
                            <div className={styles.liquidFundsDot} />
                            Liquid EVNTs
                        </div>
                        <div className={styles.liquidFundsAmount}>
                            <p className={styles.liquidFundsTotal}>{balance}</p>
                            <p className={styles.liquidFundsTitle}>EVNT</p>
                        </div>
                    </div>
                </div>
            </div>
            {openSettings && (
                <HomeSettings notShowSettingsHandler={notShowSettingsHandler} />
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    const openBetCount = _.size(state.bet.openBets);
    const openBets = state.bet.openBets;
    const balance = state.authentication.balance;
    const totalWin = state.authentication.totalWin;

    return {
        openBetCount,
        openBets,
        balance,
        totalWin,
    };
};

export default connect(mapStateToProps, null)(MainMenu);
