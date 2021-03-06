=begin comment
This is a script to sum up benchmark stats reported by different agents via
example usage:
$ cd approvedList
$ hcdev -mdns=true -no-nat-upnp scenario -benchmarks benchmark | perl ../bench.pl
Total chain: 556.23
    Total DHT: 6340.86
    Total Bytes Sent: 6306.16
    Total CPU: 3700

=end comment
=cut


$| = 1;
my $chain = 0.0;
my $dht = 0.0;
my $net = 0.0;
my $gossip = 0.0;
my $cpu = 0.0;
foreach $line ( <STDIN> ) {
#    print $line;
    chomp( $line );

    $chain += $1 if $line =~ /Chain growth: ([0-9.]+)K/;
    $dht += $1 if $line =~ /DHT growth: ([0-9.]+)K/;
    $net += $1 if $line =~ /BytesSent: ([0-9.]+)K/;
    $gossip += $1 if $line =~ /GossipSent: ([0-9.]+)K/;
    $cpu += $1 if $line =~ /CPU: ([0-9.]+)ms/;
}

print "Total chain: ${chain}K\n";
print "Total DHT: ${dht}K\n";
print "Total Bytes Sent: ${net}K\n";
print "Total Gossip Sent: ${gossip}K\n";
print "Total CPU: ${cpu}ms\n";
