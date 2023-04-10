from django.http.response import Http404
from django.shortcuts import render
from django.db.models import Q



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope


from .models import Tag
from .serializers import TagSerializer
from .paginations import CustomPagination



class TagListView(APIView):
    serializer_class = TagSerializer
    def get(self, request, pk=None, format=None, *args, **kwargs):
        data={}
        instance = Tag.objects.all()
        serializer = self.serializer_class(instance, many=True)
        data['status']={
                            "code": 200,
                            "message": "Successfully Retrieved Data"
                        }
        data['results'] =serializer.data
        status = 200
        return Response(data, status)
        


class TagApiView(APIView):
    permission_classes = (IsAuthenticated,TokenHasReadWriteScope,)
    pagination_class = CustomPagination
    serializer_class = TagSerializer

    @property
    def paginator(self):
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        else:
            pass
        return self._paginator
    def paginate_queryset(self, queryset):
        
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset,
                   self.request, view=self)
    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def filter_queryset(self, queryset, param):
        return queryset.order_by(param)

    def search_queryset(self, queryset,param):
        return queryset.objects.filter(Q(id__icontains=param) | Q(title__icontains=param))
        
    # READ a single Tag
    def get_object(self, pk):
        try:
            return Tag.objects.get(pk=pk)
        except Tag.DoesNotExist:
            raise Http404

    def get(self, request, pk=None, format=None, *args, **kwargs):
        data={}
        if pk:
            tag = self.get_object(pk)
            serializer = self.serializer_class(tag)

        else:
            instance = Tag.objects.all()

            if self.request.GET.get('ordering'):
                instance = self.filter_queryset(instance,self.request.GET.get('ordering'))
            elif self.request.GET.get('search'):
                instance = self.search_queryset(Tag,self.request.GET.get('search'))

            else:
                instance = instance.order_by('-id')
            page = self.paginate_queryset(instance)
            if page is not None:
                serializer = self.get_paginated_response(self.serializer_class(page,
    many=True).data)
            else:
                serializer = self.serializer_class(instance, many=True)

        data['status']={
                            "code": 200,
                            "message": "Successfully Retrieved Data"
                        }
        data['results'] =serializer.data
        status = 200
        return Response(data, status)

    def post(self, request, format=None):
        data={}
        tag_data = request.data
        serializer = self.serializer_class(data=tag_data)
        if serializer.is_valid():
            serializer.save()
            data['status']={
                            "code": 200,
                            "message": "Successfully Created Data"
                        }
            data['results'] =serializer.data
            status = 200
        else:
            data['status']={
                        "code": 422,
                        'message': 'Validation Error'
                }
            data['results'] =serializer.errors
            status =422
        return Response(data,status)

    def put(self, request, pk=None, format=None):
        data={}
        tag_to_update =  self.get_object(pk)
        serializer = self.serializer_class(instance=tag_to_update,data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            data['status']={
                            "code": 200,
                            "message": "Successfully Update Data"
                        }
            data['results'] =serializer.data
            status = 200
        else:
            data['status']={
                        "code": 422,
                        'message': 'Validation Error'
                    }
            data['results'] =serializer.errors
            status =422
        return Response(data,status)

    def delete(self, request, pk, format=None):
        data={}
        tag_to_delete =  self.get_object(pk)

        tag_to_delete.delete()

        data['status']={
                            "code": 200,
                            "message": "Successfully Deleted Data"
                        }
        data['results'] = {}
        status = 200
        return Response(data,status)


