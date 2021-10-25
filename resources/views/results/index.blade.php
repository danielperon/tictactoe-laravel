@extends('layout.default')

@section('content')
    <div class='container'>
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Game Number</th>
                <th scope="col">Winner's Name</th>
                {{-- <th scope="col">Moves</th> --}}
                <th scope="col">Date</th>
            </tr>
            </thead>
            <tbody>
                @foreach ($results as $item)
                    <tr>
                        <th scope="row"> {{$item->id}} </th>
                        <td>{{$item->winner_name}}</td>
                        {{-- <td> {{//count(json_decode($item->moves, true))}} </td> --}}
                        <td> {{$item->created_at->format('Y/m/d H:i:s')}} </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
