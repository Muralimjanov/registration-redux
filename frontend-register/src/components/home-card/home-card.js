import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment'
import styles from "./home-card.module.css"


const HomeCard = (props) => {
    // console.log("props>>>", props)
    const { title, brand, price, description, image, created, category } = props
    const date = created
    const formatDate = (date) => moment(date).format('DD, MMMM YYYY');

    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title=""
                subheader={formatDate(date)}
            />
            <CardMedia
                className={styles.img}
                component="img"
                height="300"
                image={image}
                alt="Paella dish"
            />
            <div className={styles.card_content}>
                <p>{title}</p>
                <p>{brand}</p>
            </div>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <div className={styles.price}>
                <p>{price} $</p>
            </div>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>

            </CardActions>
        </Card>
    )
}

export default HomeCard