import '../styles/ScaleTransition.css';

interface ScaleTransitionProps {
    src: string;
    active?: boolean;
    position: string;
}

const ScaleTransition: React.FC<ScaleTransitionProps> = ({ src, active = false, position }) => {
    return (
        <div className="image-container" >
            <div
                className={`image-bg ${active ? 'zoomed' : ''}`}
                style={{ backgroundImage: `url(${src})`, backgroundPosition: position}}
                aria-hidden="true"
            />
        </div>
    )
}

export default ScaleTransition