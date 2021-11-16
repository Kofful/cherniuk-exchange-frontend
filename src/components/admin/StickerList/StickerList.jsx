import {observer} from "mobx-react";
import {useStore} from "../../../stores";
import Spinner from "../../spinner/Spinner";
import {useEffect, useState} from "react";
import {getStickers} from "../../../api/stickers";
import {useCookies} from "react-cookie";
import StickerRow from "./StickerRow";
import {updateSticker as updateStickerInDb} from "../../../api/stickers";

const StickerList = () => {
    const {stickerStore} = useStore();
    const {stickers, isLoading} = stickerStore;

    const [page, changePage] = useState(1);

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
            } catch {
                stickerStore.updateStickers({});
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
                        <div className="col-3">Sticker</div>
                        <div className="col-4">Name</div>
                        <div className="col-4">Coefficient</div>
                    </div>
                    <div>
                    {stickers.map(sticker => <StickerRow key={sticker.id} sticker={sticker}
                                                         updateSticker={updateSticker}/>)}
                    </div>
                </div>
                <div className="d-flex justify-content-around">
                    <button
                        onClick={() => changePage(page - 1)}
                        className={`btn btn-secondary w-25 ${page > 1 ? "" : "invisible"}`}>
                        Previous page
                    </button>

                    <button
                        onClick={() => changePage(page + 1)}
                        className={`btn btn-secondary w-25 ${page < 3 ? "" : "invisible"}`}>
                        Next page
                    </button>
                </div>
            </>

            }
            {isLoading === true && <div className="position-absolute d-flex justify-content-center align-items-center top-50 start-50 translate-middle">
                <Spinner/>
            </div>}
        </>
    );
};

export default observer(StickerList);
