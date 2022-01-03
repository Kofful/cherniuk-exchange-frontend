import PropTypes from "prop-types";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import {FormattedMessage} from "react-intl";
import UserItems from "../UserItems";
import CreateOfferForm from "../../offer/CreateOffer/CreateOfferForm";
import ActiveOffers from "../ActiveOffers";
import IncomingOffers from "../IncomingOffers";
import {useEffect, useState} from "react";

const InteractButtons = ({loggedInUserId, userId}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const canShowCreateOfferTab = loggedInUserId && userId !== loggedInUserId;
    const canShowIncomingOffersTab = userId === loggedInUserId;

    const changeIndex = index => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        changeIndex(0);
    }, [userId])

    return (
        <Tabs selectedTabClassName="nav-selected" selectedIndex={selectedIndex} onSelect={changeIndex}>
            <TabList className="nav nav-tabs nav-fill">
                <Tab>
                    <FormattedMessage
                        id="inventory"
                        defaultMessage="Inventory"
                    />
                </Tab>
                <Tab>
                    <FormattedMessage
                        id="offers.active"
                        defaultMessage="Active offers"
                    />
                </Tab>
                {canShowIncomingOffersTab &&
                    <Tab>
                        <FormattedMessage
                            id="offers.incoming"
                            defaultMessage="Incoming offers"
                        />
                    </Tab>
                }
                {canShowCreateOfferTab &&
                    <Tab>
                        <FormattedMessage
                            id="offer.create"
                            defaultMessage="Create offer"
                        />
                    </Tab>
                }
            </TabList>

            <TabPanel>
                <UserItems userId={userId}/>
            </TabPanel>

            <TabPanel>
                <ActiveOffers userId={userId}/>
            </TabPanel>

            {canShowIncomingOffersTab &&
                <TabPanel>
                    <IncomingOffers userId={userId}/>
                </TabPanel>
            }

            {canShowCreateOfferTab &&
                <TabPanel>
                    <CreateOfferForm addresseeId={userId}/>
                </TabPanel>
            }
        </Tabs>
    );
};

InteractButtons.propTypes = {
    loggedInUserId: PropTypes.number,
    userId: PropTypes.number
};

InteractButtons.defaultProps = {
    loggedInUserId: 0,
    userId: 0
}

export default InteractButtons;
