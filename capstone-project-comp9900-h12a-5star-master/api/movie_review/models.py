from djongo import models
import datetime
from multiselectfield import MultiSelectField

class movies(models.Model):
    movie_id = models.IntegerField(unique=True,default=0)

class reviews(models.Model):
    class Meta:
        unique_together = (('review_user_id', 'movie_id'),)

    review_user_id = models.CharField(max_length=30, blank=False, unique=False)
    #movie = models.ForeignKey(movies,to_field='movie_id', related_name='movie', on_delete=models.CASCADE, default=None)
    movie_id = models.IntegerField(unique=False,default=0)
    review = models.CharField(max_length=300, blank=True, unique=False)
    rating=models.FloatField(default=0.0)
    wishlist=models.BooleanField(default=False)
    liked=models.BooleanField(default=False)
    watched=models.BooleanField(default=False)
    review_time=models.TimeField(auto_now=False, default=datetime.datetime.now().time())
    review_date=models.DateField(auto_now=False, default=datetime.date.today())
    Time=models.TimeField(auto_now=True)
    Date=models.DateField(auto_now=True)
    upvote_count=models.IntegerField(default=0)
    like_reviewers = MultiSelectField(default= None)
    follow=models.BooleanField(default=False)
