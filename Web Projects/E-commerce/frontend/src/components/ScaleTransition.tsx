import '../styles/ScaleTransition.css';

interface ScaleTransitionProps {
    src: string;
    active?: boolean;
}

const ScaleTransition: React.FC<ScaleTransitionProps> = ({ src, active = false }) => {
    return (
        <div className="image-wrap" >
            <div
                className={`image-bg ${active ? 'zoomed' : ''}`}
                style={{ backgroundImage: `url(${src})` }}
                aria-hidden="true"
            />
        </div>
    )
}

export default ScaleTransition