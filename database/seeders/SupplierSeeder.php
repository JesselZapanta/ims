<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $suppliers = [
            ['name' => 'Tech Supply Co.', 'contact' => '09123456789', 'email' => 'info@techsupply.com', 'address' => '123 Tech Street, Manila'],
            ['name' => 'Home Essentials Inc.', 'contact' => '09234567890', 'email' => 'contact@homeessentials.com', 'address' => '456 Home Ave, Quezon City'],
            ['name' => 'Fresh Market Supplies', 'contact' => '09345678901', 'email' => 'sales@freshmarket.com', 'address' => '789 Market Road, Cebu'],
            ['name' => 'Auto Parts Hub', 'contact' => '09456789012', 'email' => 'support@autoparts.com', 'address' => '101 Auto Drive, Davao'],
            ['name' => 'Office Solutions Ltd.', 'contact' => '09567890123', 'email' => 'service@officesolutions.com', 'address' => '202 Office Lane, Makati'],
            ['name' => 'Sports Gear Pro', 'contact' => '09678901234', 'email' => 'orders@sportsgearpro.com', 'address' => '303 Sports St, Taguig'],
            ['name' => 'Beauty Essentials', 'contact' => '09789012345', 'email' => 'care@beautyessentials.com', 'address' => '404 Beauty Blvd, Pasig'],
            ['name' => 'Construction Depot', 'contact' => '09890123456', 'email' => 'info@constructiondepot.com', 'address' => '505 Build Way, Cavite'],
            ['name' => 'Pet Care World', 'contact' => '09901234567', 'email' => 'hello@petcareworld.com', 'address' => '606 Pet Street, Laguna'],
            ['name' => 'Green Life Organics', 'contact' => '09112345678', 'email' => 'sales@greenlife.com', 'address' => '707 Greenfield, Batangas'],
            ['name' => 'Digital Trends', 'contact' => '09223456789', 'email' => 'support@digitaltrends.com', 'address' => '808 Tech Park, Pampanga'],
            ['name' => 'Health & Wellness Center', 'contact' => '09334567890', 'email' => 'contact@healthwellness.com', 'address' => '909 Wellness Ave, Baguio'],
            ['name' => 'Fashion Forward', 'contact' => '09445678901', 'email' => 'info@fashionforward.com', 'address' => '1010 Style Street, Iloilo'],
            ['name' => 'Gaming Universe', 'contact' => '09556789012', 'email' => 'support@gaminguniverse.com', 'address' => '1111 Game Hub, CDO'],
            ['name' => 'Baby Needs Store', 'contact' => '09667890123', 'email' => 'care@babyneeds.com', 'address' => '1212 Baby Lane, Bacolod'],
            ['name' => 'Hardware Masters', 'contact' => '09778901234', 'email' => 'info@hardwaremasters.com', 'address' => '1313 Tools Street, Tacloban'],
            ['name' => 'Music Haven', 'contact' => '09889012345', 'email' => 'orders@musichaven.com', 'address' => '1414 Melody Road, Zamboanga'],
            ['name' => 'Gadget World', 'contact' => '09990123456', 'email' => 'support@gadgetworld.com', 'address' => '1515 Gadget Plaza, Davao'],
            ['name' => 'Eco-Friendly Supplies', 'contact' => '09101234567', 'email' => 'info@ecofriendly.com', 'address' => '1616 Nature Lane, Palawan'],
            ['name' => 'Industrial Tools Corp.', 'contact' => '09212345678', 'email' => 'service@industrialtools.com', 'address' => '1717 Industry Zone, Cebu'],
        ];

        Supplier::insertOrIgnore($suppliers);
    }
}
