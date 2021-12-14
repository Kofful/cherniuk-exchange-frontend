import {observer} from "mobx-react";
import {useStore} from "../../../stores";
import Spinner from "../../spinner/Spinner";
import {useEffect, useState} from "react";
import {getStickers} from "../../../api/stickers";
import {useCookies} from "react-cookie";
import StickerRow from "./StickerRow";
import {updateSticker as updateStickerInDb} from "../../../api/stickers";
import {FormattedMessage} from "react-intl";
import PageButtons from "../../pagination/PageButtons";

const StickerList = () => {
    const {stickerStore} = useStore();
    const {stickers, isLoading} = stickerStore;

    const [page, changePage] = useState(1);
    const [maxPages, changeMaxPages] = useState(1);

    const [cookies] = useCookies();

    const updateSticker = async (field, sticker) => {
        try {
            await updateStickerInDb(sticker, cookies.token);
        } catch {
            sticker.dirty[field] = true;
        }
        const newStickers = stickers.map(item => (item.id === sticker.id ? sticker : item));
        stickerStore.updateStickers(newStickers);
    };

    useEffect(() => {
        const storeStickers = async () => {
            stickerStore.setIsLoading(true);
            try {
                const json = await getStickers(page, cookies.token);
                stickerStore.updateStickers(json.stickers);
                changeMaxPages(Math.floor((json.count - 1) / 10) + 1);
            } catch {
                stickerStore.updateStickers({});
                changeMaxPages(1);
            }
        }
        storeStickers();
    }, [page]);

    return (
        <>
            {isLoading === false && stickers && <>
                <div className="table table-dark mt-5 mx-2">
                    <div className="d-flex w-100 p-2 border border-secondary">
                        <div className="col">#</div>
                        <div className="col-3">
                            <FormattedMessage
                                id="sticker"
                                defaultMessage="Sticker"
                            />
                        </div>
                        <div className="col-4">
                            <FormattedMessage
                                id="input.name"
                                defaultMessage="Name"
                            />
                        </div>
                        <div className="col-4">
                            <FormattedMessage
                                id="input.coefficient"
                                defaultMessage="Coefficient"
                            />
                        </div>
                    </div>
                    <div>
                    {stickers.map(sticker => <StickerRow key={sticker.id} sticker={sticker}
                                                         updateSticker={updateSticker}/>)}
                    </div>
                </div>
                <PageButtons changePage={changePage} page={page} maxPages={maxPages}/>
            </>

            }
            {isLoading === true && <div className="position-absolute d-flex justify-content-center align-items-center top-50 start-50 translate-middle">
                <Spinner/>
            </div>}
        </>
    );
};

export default observer(StickerList);
