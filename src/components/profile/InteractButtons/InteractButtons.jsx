import PropTypes from "prop-types";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import {FormattedMessage} from "react-intl";
import UserItems from "../UserItems";
import CreateOfferForm from "../../offer/CreateOffer/CreateOfferForm";
import ActiveOffers from "../ActiveOffers";

const InteractButtons = ({loggedInUserId, userId}) => {
    const canShowCreateOfferTab = loggedInUserId && userId !== loggedInUserId;

    return (
        <Tabs selectedTabClassName="nav-selected">
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
