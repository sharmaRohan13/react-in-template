import './App.css';

import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const text = `
Lorem {{ ipsum }} dolor sit amet, consectetur adipiscing elit. Duis
condimentum lobortis mi sit amet venenatis. Donec id
eros lobortis, faucibus sapien et, euismod diam.
Phasellus vulputate {{ ipsum }} ac ornare aliquet. Nunc id
volutpat eros, a congue {{ ipsum }}. Mauris placerat dictum
magna, vitae egestas risus pellentesque ac. Ut urna
ante, tincidunt vitae nisi ac, egestas gravida tellus.
Phasellus ac ante {{ ipsum }}. Sed a diam lorem. Mauris
dapibus pretium augue vel ultrices. Nullam maximus, eros
eu vestibulum ullamcorper, nisi purus ultricies libero,
in placerat urna tortor egestas elit. Ut ultrices auctor
orci ac ultrices. Pellentesque et {{ ipsum }} et arcu
sollicitudin mollis. Mauris non diam eget elit
condimentum convallis a id justo. Curabitur ac lectus
ultrices, gravida enim a, lobortis elit. Fusce pharetra
fringilla nibh consectetur sodales. Nunc interdum non
nisi eget luctus. Mauris id pulvinar est. Lorem {{ ipsum }}
dolor sit amet, consectetur adipiscing elit. Integer
ligula nulla, dictum a semper ac, consectetur et risus.
Donec vitae odio at nisl porta luctus. Ut fermentum
laoreet ligula, at feugiat ante hendrerit in. Donec
blandit nec purus sit amet dictum. Vestibulum eu augue
congue, porttitor lacus eget, fringilla ante. Sed a ante
eu nunc porta molestie. Suspendisse fringilla auctor
odio, in pulvinar tortor ornare eu. Nunc ac tempus elit,
sit amet accumsan metus. Sed vitae tellus magna. Aenean
molestie tincidunt leo, ut ultricies lectus euismod et.
Vestibulum fringilla urna eu justo pellentesque dictum.
Etiam a posuere velit. Ut vehicula ligula ultrices augue
blandit tristique. Nam commodo tincidunt viverra. Orci
varius natoque penatibus et magnis dis parturient
montes, nascetur ridiculus mus. Donec bibendum, urna ac
rhoncus tempus, lorem felis maximus mi, ac condimentum
eros mauris vel purus. Ut fermentum rhoncus ex, id
dictum justo aliquam quis. Sed eu ornare arcu, dignissim
egestas elit. Duis semper dui tincidunt, ornare eros sit
amet, dictum ex. Suspendisse laoreet nisi mauris, nec
rutrum dui dignissim at. In convallis aliquet diam, eget
venenatis lacus mattis et. Vivamus in orci in metus
placerat ultricies. Fusce rutrum suscipit ante, id
euismod {{ ipsum }} interdum ut. Curabitur non sapien dictum,
tincidunt risus non, rutrum nunc. In malesuada placerat
sem viverra commodo. Cras faucibus tellus id leo
pharetra, in consectetur massa molestie. Nulla id
egestas turpis. Aenean cursus ullamcorper congue.
Integer enim dolor, condimentum id tellus in, fermentum
placerat sem. Donec est mauris, ullamcorper ut elit sed,
    tempor hendrerit mauris.
`;
const markup = `
<h4 className="display-4 text-center">Mustache Template</h4>
<br />
<div class="row">
    <div class="col col-4">
        <strong>Enter some long giberish text.</strong>
        <p>${text}</p>
    </div>
    <div class="col col-8">
        <div class="row">
            <div class="col col-4">
                <div class="portal">
                    <img class="img" id="img1" src="favicon.ico"></img>
                </div>
            </div>
            <div class="col col-8">
                <div class="portal">
                    <img class="img" id="img2" src="logo512.png"></img>
                </div>
            </div>
        </div>
        <br />
        <div class="row">
            <div class="col col-4">
                <div class="portal">
                    <img class="img" id="img3" src="logo192.png"></img>
                </div>
            </div>
            <div class="col col-8">
                <div class="portal">
                    <img class="img" id="img4" src="logo192.png"></img>
                </div>
            </div>
        </div>
    </div>
</div>
`;

type Style = {
    [key: string]: number | string;
};

function App() {
    const [styles, setStyles] = useState<Style[]>([]);

    const overlayPortal = () => {
        const stylesArr: Style[] = [];
        document.querySelectorAll('.img').forEach((underlay) => {
            const { top, left, height, width } =
                underlay.getBoundingClientRect();
            stylesArr.push({
                top,
                left,
                height,
                width,
            });
        });
        setStyles(stylesArr);
    };

    useEffect(() => {
        setTimeout(() => {
            overlayPortal();
        }, 25);
        window.addEventListener('scroll', overlayPortal);
        return () => window.removeEventListener('scroll', overlayPortal);
    }, []);

    const renderPortals = () => {
        const portals: JSX.Element[] = [];
        document.querySelectorAll('.portal').forEach((portal, i) => {
            portals.push(
                ReactDOM.createPortal(
                    <Portal style={styles[i]} name={portal.children[0].id} />,
                    portal
                )
            );
        });
        return portals;
    };

    return (
        <div className="r4e-world">
            <h4 className="display-4">R4E World</h4>
            <div className="mustache">
                {parse(markup)}
                {renderPortals()}
            </div>
        </div>
    );
}

function Portal({ style, name }: { style: Style; name: string }) {
    const [cnt, setCnt] = useState(0);
    const [isShown, setIsShown] = useState(false);
    const defaultStyle: Style = {
        position: 'fixed',
        zIndex: 1000,
        background: '#000',
        opacity: 0.75,
        border: '1px solid',
    };

    return (
        <div
            className="custom"
            onClick={() => {
                setCnt(cnt + 1);
            }}
            style={{
                ...defaultStyle,
                ...style,
            }}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
            <div className="content">
                <div>ID: {name}</div>
                <div>Click: {cnt}</div>
                {isShown && <div className="shown">Mouse</div>}
            </div>
        </div>
    );
}

export default App;
